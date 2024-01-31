<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ExceedingRule, type IntrusionRule } from 'domain/dist/domain/security-rule/core'
import NewSecurityRulePopup from '@/components/security-rule/NewSecurityRulePopup.vue'
import SecurityRuleBadge from '@/components/security-rule/SecurityRuleBadge.vue'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import { MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'
import {
  composeExceedingSecurityRule,
  composeIntrusionSecurityRule
} from '@/scripts/presentation/security-rule/ComposeSecurityRule'
import { popNegative, popPositive } from '@/scripts/Popups.js'
import { useQuasar } from "quasar";

const exceedingsSecurityRules: ref<ExceedingRule[]> = ref([])
const intrusionsSecurityRules: ref<IntrusionRule[]> = ref([])
const $q = useQuasar()

const getExceedingSecurityRules = async () => {
  await RequestHelper.get(`http://${alarmHost}:${alarmPort}/security-rules/exceedings`)
    .then((res: any) => {
      exceedingsSecurityRules.value = []
      for (let i = 0; i < res.data.length; i++) {
        exceedingsSecurityRules.value.push(composeExceedingSecurityRule(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const getIntrusionSecurityRules = async () => {
  await RequestHelper.get(`http://${alarmHost}:${alarmPort}/security-rules/intrusions`)
    .then((res: any) => {
      intrusionsSecurityRules.value = []
      for (let i = 0; i < res.data.length; i++) {
        intrusionsSecurityRules.value.push(composeIntrusionSecurityRule(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const insertExceedingRule = async (exceedingRule: ExceedingRule) => {
  await RequestHelper.post(`http://${alarmHost}:${alarmPort}/security-rules/exceedings`, {
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
      popPositive($q, 'Exceeding rule added successfully')
      await getExceedingSecurityRules()
    })
    .catch(error => {
      popNegative($q, 'Error while adding exceeding rule')
      console.log(error)
    })
}

const insertIntrusionRule = async (intrusionRule: IntrusionRule) => {
  await RequestHelper.post(`http://${alarmHost}:${alarmPort}/security-rules/intrusions`, {
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
      popPositive($q, 'Intrusion rule added successfully')
      await getIntrusionSecurityRules()
    })
    .catch(error => {
      popNegative($q, 'Error while adding intrusion rule')
      console.log(error)
    })
}

const deleteIntrusionRule = async (intrusionRule: IntrusionRule) => {
  await RequestHelper.delete(
    `http://${alarmHost}:${alarmPort}/security-rules/intrusions/` + intrusionRule.securityRuleId
  )
    .then(async (res: any) => {
      popPositive($q, 'Intrusion rule deleted successfully')
      await getIntrusionSecurityRules()
    })
    .catch(error => {
      popNegative($q, 'Error while deleting intrusion rule')
      console.log(error)
    })
}

const deleteExceedingRule = async (exceedingRule: ExceedingRule) => {
  await RequestHelper.delete(
    `http://${alarmHost}:${alarmPort}/security-rules/exceedings/` + exceedingRule.securityRuleId
  )
    .then(async (res: any) => {
      popNegative($q, 'Exceeding rule deleted successfully')
      await getExceedingSecurityRules()
    })
    .catch(error => {
      popNegative($q, 'Error while deleting exceeding rule')
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
      @delete-security-rule="deleteExceedingRule(exceedingRule)"
    />
  </div>

  <h2>Camera alarms:</h2>
  <div class="intrusion-rules-container">
    <security-rule-badge
      v-for="intrusionRule in intrusionsSecurityRules"
      :security-rule="intrusionRule"
      @delete-security-rule="deleteIntrusionRule(intrusionRule)"
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
