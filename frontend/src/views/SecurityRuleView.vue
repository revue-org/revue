<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NewSecurityRulePopup from '@/components/security-rule/NewSecurityRulePopup.vue'
import RuleBadge from '@/components/security-rule/RuleBadge.vue'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import {
  composeRangeRule,
  composeIntrusionRule
} from '@/presentation/ComposeSecurityRule.js'
import { popNegative, popPositive } from '@/scripts/Popups.js'
import { useQuasar } from 'quasar'
import type { IntrusionRule, RangeRule, SecurityRule } from "@/domain/core/SecurityRule";

const rangeRules: ref<RangeRule[]> = ref([])
const intrusionRules: ref<IntrusionRule[]> = ref([])
const $q = useQuasar()

const getRangeRules = async () => {
  await RequestHelper.get(`http://${alarmHost}:${alarmPort}/rules/ranges`)
    .then((res: any) => {
      rangeRules.value = []
      for (let i = 0; i < res.data.length; i++) {
        rangeRules.value.push(composeRangeRule(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const getIntrusionRules = async () => {
  await RequestHelper.get(`http://${alarmHost}:${alarmPort}/rules/intrusions`)
    .then((res: any) => {
      intrusionRules.value = []
      for (let i = 0; i < res.data.length; i++) {
        intrusionRules.value.push(composeIntrusionRule(res.data[i]))
      }
    })
    .catch(error => {
      console.log(error)
    })
}


const deleteRule = async (rule: SecurityRule) => {
  await RequestHelper.delete(
    `http://${alarmHost}:${alarmPort}/rules/` + rule.id
  )
    .then(async (_res: any) => {
      popPositive($q, 'Rule deleted successfully')
      await getRangeRules()
    })
    .catch(error => {
      popNegative($q, 'Error while deleting rule')
      console.log(error)
    })
}

onMounted(async () => {
  await getRangeRules()
  await getIntrusionRules()
})

const popupVisible = ref<boolean>(false)
</script>

<template>
  <div class="new-security-rule">
    <q-btn label="Add a security rule" color="primary" @click="popupVisible = true" />
  </div>

  <h2>Outliers alarms:</h2>
  <div class="outlier-container">
    <rule-badge
      v-for="(rule, index) in rangeRules"
      :rule="rule"
      @delete-security-rule="deleteRule(rule)"
      :key="index"
    />
  </div>

  <h2>Intrusions alarms:</h2>
  <div class="intrusion-rules-container">
  <rule-badge
    v-for="(rule, index) in intrusionRules"
    :rule="rule"
    @delete-security-rule="deleteRule(rule)"
    :key="index"
  />
</div>

  <new-security-rule-popup
    v-model="popupVisible"
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
