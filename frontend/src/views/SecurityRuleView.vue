<script lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SecurityRuleFactory } from '@domain/security-rule/factories/SecurityRuleFactory'
import { SecurityRuleFactoryImpl } from '@domain/security-rule/factories/impl/SecurityRuleFactoryImpl'
import { type ExceedingRule, type IntrusionRule } from 'domain/dist/domain/security-rule/core'
import type { DeviceIdFactory } from '@domain/device/factories'
import type { ContactFactory } from '@domain/monitoring/factories'
import { ContactFactoryImpl } from '@domain/monitoring/factories/impl/ContactFactoryImpl'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl'
import { type Contact } from '@domain/monitoring/core'
import NewSecurityRulePopup from '@/components/security-rule/NewSecurityRulePopup.vue'
import SecurityRuleBadge from '@/components/security-rule/SecurityRuleBadge.vue'
import RequestHelper from '@/utils/RequestHelper'
import { ContactTypeConverter, MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const contactFactory: ContactFactory = new ContactFactoryImpl()

const exceedingsSecurityRules: ref<ExceedingRule[]> = ref([])

const intrusionsSecurityRules: ref<IntrusionRule[]> = ref([])

const getExceedingSecurityRules = async () => {
  await RequestHelper.get('http://localhost:4000/security-rules/exceedings')
    .then((res: any) => {
      exceedingsSecurityRules.value = []
      for (let i = 0; i < res.data.length; i++) {
        exceedingsSecurityRules.value.push(composeExceedingSecurityRule(res.data[i]))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const getIntrusionSecurityRules = async () => {
  await RequestHelper.get('http://localhost:4000/security-rules/intrusions')
    .then((res: any) => {
      intrusionsSecurityRules.value = []
      for (let i = 0; i < res.data.length; i++) {
        intrusionsSecurityRules.value.push(composeIntrusionSecurityRule(res.data[i]))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function composeExceedingSecurityRule(exceedingRule: any): ExceedingRule {
  return securityRuleFactory.createExceedingRule(
    exceedingRule.minValue,
    exceedingRule.maxValue,
    MeasureConverter.convertToMeasure(exceedingRule.measure),
    exceedingRule._id,
    deviceIdFactory.createSensorId(exceedingRule.deviceId.code),
    exceedingRule.creatorId,
    composeContacts(exceedingRule.contacts),
    exceedingRule.description,
    new Date(exceedingRule.from),
    new Date(exceedingRule.to)
  )
}

function composeIntrusionSecurityRule(intrusionRule: any): IntrusionRule {
  return securityRuleFactory.createIntrusionRule(
    ObjectClassConverter.convertToObjectClass(intrusionRule.objectClass),
    intrusionRule._id,
    deviceIdFactory.createCameraId(intrusionRule.deviceId.code),
    intrusionRule.creatorId,
    composeContacts(intrusionRule.contacts),
    intrusionRule.description,
    new Date(intrusionRule.from),
    new Date(intrusionRule.to)
  )
}

function composeContacts(contacts: any): Contact[] {
  return contacts.map((contact: any) => {
    return contactFactory.createContact(
      contact._id,
      contact.value,
      ContactTypeConverter.convertToContactType(contact.type)
    )
  })
}

const deleteIntrusionRule = async (intrusionRule: IntrusionRule) => {
  await RequestHelper.delete(
    'http://localhost:4000/security-rules/intrusions/' + intrusionRule.securityRuleId
  )
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getIntrusionSecurityRules()
    })
    .catch((error) => {
      console.log(error)
    })
}

const deleteExceedingRule = async (exceedingRule: ExceedingRule) => {
  await RequestHelper.delete(
    'http://localhost:4000/security-rules/exceedings/' + exceedingRule.securityRuleId
  )
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getExceedingSecurityRules()
    })
    .catch((error) => {
      console.log(error)
    })
}

const insertExceedingRule = async (exceedingRule: ExceedingRule) => {
  await RequestHelper.post('http://localhost:4000/security-rules/exceedings', {
    deviceId: {
      code: exceedingRule.deviceId.code
    },
    creatorId: exceedingRule.creatorId,
    description: exceedingRule.description,
    measure: MeasureConverter.convertToString(exceedingRule.measure),
    minValue: exceedingRule.min,
    maxValue: exceedingRule.max,
    from: exceedingRule.from.toISOString(),
    to: exceedingRule.to.toISOString(),
    contacts: exceedingRule.contactsToNotify
  })
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getExceedingSecurityRules()
      await getIntrusionSecurityRules()
    })
    .catch((error) => {
      console.log(error)
    })
}

const insertIntrusionRule = async (intrusionRule: IntrusionRule) => {
  await RequestHelper.post('http://localhost:4000/security-rules/intrusions', {
    deviceId: {
      code: intrusionRule.deviceId.code
    },
    creatorId: intrusionRule.creatorId,
    description: intrusionRule.description,
    objectClass: ObjectClassConverter.convertToString(intrusionRule.objectClass),
    from: intrusionRule.from.toISOString(),
    to: intrusionRule.to.toISOString(),
    contacts: intrusionRule.contactsToNotify
  })
    .then(async (res: any) => {
      //TODO A CONFIRM POPUP
      await getExceedingSecurityRules()
      await getIntrusionSecurityRules()
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  await getExceedingSecurityRules()
  await getIntrusionSecurityRules()
})

const popupVisible = ref<boolean>(false)
</script>

<template>
  <div class="new-security-rule">
    <q-btn label="Add a security rule" color="primary" @click="popupVisible = true" />
  </div>

  <h2>Sensor alarms:</h2>
  <div class="exceeding-rules-container">
    <security-rule-badge
      v-for="exceedingRule in exceedingsSecurityRules"
      :security-rule="exceedingRule"
      @delete-exceeding-rule="deleteExceedingRule(exceedingRule)"
    />
  </div>

  <h2>Camera alarms:</h2>
  <div class="intrusion-rules-container">
    <security-rule-badge
      v-for="intrusionRule in intrusionsSecurityRules"
      :security-rule="intrusionRule"
      @delete-intrusion-rule="deleteIntrusionRule(intrusionRule)"
    />
  </div>

  <new-security-rule-popup
    v-model="popupVisible"
    @insert-exceeding-rule="insertExceedingRule"
    @insert-intrusion-rule="insertIntrusionRule"
  ></new-security-rule-popup>
</template>

<style scoped lang="scss">
div.new-security-rule {
  text-align: center;
  padding-top: 15px;
}

h2 {
  margin: 0.5rem 1rem;
}

div.exceeding-rules-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}

div.intrusion-rules-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}
</style>
