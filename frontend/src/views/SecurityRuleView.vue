<script lang="ts"></script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SecurityRuleFactory } from '@domain/security-rule/factories/SecurityRuleFactory'
import { SecurityRuleFactoryImpl } from '@domain/security-rule/factories/impl/SecurityRuleFactoryImpl'
import { type ExceedingRule, type IntrusionRule } from 'domain/dist/domain/security-rule/core'
import type { DeviceIdFactory } from 'domain/dist/domain/device/factories'
import type { ContactFactory } from 'domain/dist/domain/monitoring/factories'
import { ContactFactoryImpl } from 'domain/dist/domain/monitoring/factories/impl/ContactFactoryImpl'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl'
import { type Contact } from 'domain/dist/domain/monitoring/core'
import SecurityRule from '@/components/security-rule/SecurityRule.vue'
import NewSecurityRulePopup from '@/components/security-rule/NewSecurityRulePopup.vue'
import { RequestHelper } from '@/utils/RequestHelper'
import { ContactTypeConverter, MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const contactFactory: ContactFactory = new ContactFactoryImpl()

const exceedingsSecurityRules: ref<ExceedingRule[]> = ref([])

const intrusionsSecurityRules: ref<IntrusionRule[]> = ref([])

const getExceedingSecurityRules = async () => {
  await RequestHelper.get('http://localhost:4000/security-rules/exceedings')
    .then((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].deviceId.type == 'SENSOR')
          // to remove
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
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].deviceId.type == 'CAMERA')
          // to remove
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

const deleteIntrusionRule = (intrusionRule: IntrusionRule) => {
  console.log('Elimina intrusion rule')
}

const deleteExceedingRule = (exceedingRule: ExceedingRule) => {
  console.log('Elimina exceeding rule')
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
    <security-rule
      v-for="exceedingRule in exceedingsSecurityRules"
      :security-rule="exceedingRule"
      @delete-security-rule="deleteExceedingRule(exceedingRule)"
    />
  </div>

  <h2>Camera alarms:</h2>
  <div class="intrusion-rules-container">
    <security-rule
      v-for="intrusionRule in intrusionsSecurityRules"
      :security-rule="intrusionRule"
      @delete-security-rule="deleteIntrusionRule(intrusionRule)"
    />
  </div>

  <!-- da correggere que get in update, ma prima da fare creazione.-->
  <new-security-rule-popup
    v-model="popupVisible"
    @update-security-rules="getExceedingSecurityRules"
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
