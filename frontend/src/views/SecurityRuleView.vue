<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NewRulePopup from '@/components/security-rule/NewRulePopup.vue'
import RuleBadge from '@/components/security-rule/RuleBadge.vue'
import RequestHelper, { alarmHost } from '@/utils/RequestHelper'
import { composeIntrusionRule, composeRangeRule } from '@/presentation/ComposeSecurityRule.js'
import { popNegative, popPositive } from '@/scripts/Popups.js'
import { useQuasar } from 'quasar'
import type { IntrusionRule, RangeRule, SecurityRule } from '@/domain/core/SecurityRule'

const rangeRules: ref<RangeRule[]> = ref([])
const intrusionRules: ref<IntrusionRule[]> = ref([])
const $q = useQuasar()

const getRangeRules = async () => {
  await RequestHelper.get(`${alarmHost}/rules/ranges`)
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
  await RequestHelper.get(`${alarmHost}/rules/intrusions`)
    .then((res: any) => {
      console.log(res.data)
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
  console.log(rule)
  await RequestHelper.delete(`${alarmHost}/rules/` + rule.id)
    .then(async (_res: any) => {
      popPositive($q, 'Rule deleted successfully')
      rule.type === 'range' ? await getRangeRules() : await getIntrusionRules()
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
  <div class="new-rule">
    <q-btn label="Add a security rule" color="primary" @click="popupVisible = true" />
  </div>

  <h2>Ranges alarms:</h2>
  <div class="range-container">
    <rule-badge
      v-for="(rule, index) in rangeRules"
      :rule="rule"
      @delete-rule="deleteRule(rule)"
      @get-range-rules="getRangeRules"
      @get-intrusion-rules="getIntrusionRules"
      :key="index"
    />
  </div>

  <h2>Intrusions alarms:</h2>
  <div class="intrusion-container">
    <rule-badge
      v-for="(rule, index) in intrusionRules"
      :rule="rule"
      @delete-rule="deleteRule(rule)"
      @get-range-rules="getRangeRules"
      @get-intrusion-rules="getIntrusionRules"
      :key="index"
    />
  </div>
  <new-rule-popup
    v-model="popupVisible"
    @get-range-rules="getRangeRules"
    @get-intrusion-rules="getIntrusionRules"
  ></new-rule-popup>
</template>

<style scoped lang="scss">
div.new-rule {
  text-align: center;
  padding-top: 15px;
}

h2 {
  margin: 0.5rem 1rem;
}

div.range-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}

div.intrusion-container {
  margin: 0.5rem 1rem;
  display: flex;
  gap: 1rem;
}
</style>
