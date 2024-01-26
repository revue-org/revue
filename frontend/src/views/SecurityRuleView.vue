<script lang="ts"></script>
<script setup lang="ts">
import { ref } from 'vue'
import type { SecurityRuleFactory } from '@domain/security-rule/factories/SecurityRuleFactory'
import { SecurityRuleFactoryImpl } from '@domain/security-rule/factories/impl/SecurityRuleFactoryImpl'
import {
  type ExceedingRule,
  type IntrusionRule,
  ObjectClass
} from 'domain/dist/domain/security-rule/core'
import type { DeviceIdFactory } from 'domain/dist/domain/device/factories'
import type { ContactFactory } from 'domain/dist/domain/monitoring/factories'
import { ContactFactoryImpl } from 'domain/dist/domain/monitoring/factories/impl/ContactFactoryImpl'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl'
import { ContactType } from 'domain/dist/domain/monitoring/core'
import { Measure } from 'domain/dist/domain/device/core'
import SecurityRule from '@/components/security-rule/SecurityRule.vue'
import NewSecurityRulePopup from '@/components/security-rule/NewSecurityRulePopup.vue'

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const contactFactory: ContactFactory = new ContactFactoryImpl()

const exceedingsSecurityRules: ref<ExceedingRule[]> = ref([
  securityRuleFactory.createExceedingRule(
    0,
    100,
    Measure.TEMPERATURE,
    'securityRuleId',
    deviceIdFactory.createSensorId('Sensor 1'),
    'creatorId',
    [contactFactory.createContact('creatorId', 'mail@gmail.com', ContactType.EMAIL)],
    'descrizione regola di sicurezza exceeding',
    new Date(),
    new Date()
  )
])
const intrusionSecurityRules: ref<IntrusionRule[]> = ref([
  securityRuleFactory.createIntrusionRule(
    ObjectClass.PERSON,
    'securityRuleId',
    deviceIdFactory.createCameraId('Camera 1'),
    'creatorId',
    [contactFactory.createContact('creatorId', '3333333333', ContactType.SMS)],
    'descrizione regola di sicurezza intrusion',
    new Date(),
    new Date()
  )
])

const deleteIntrusionRule = (intrusionRule: IntrusionRule) => {
  /*const index = cameras.value.findIndex((s: Camera) => s.deviceId === camera.deviceId)
  if (index !== -1) {
    cameras.value.splice(index, 1)
  }*/
  console.log('Elimina intrusion rule')
}

const deleteExceedingRule = (exceedingRule: ExceedingRule) => {
  /*const index = cameras.value.findIndex((s: Camera) => s.deviceId === camera.deviceId)
  if (index !== -1) {
    cameras.value.splice(index, 1)
  }*/
  console.log('Elimina exceeding rule')
}

const getSecurityRules = () => {
  console.log('get security rules')
}

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
      v-for="intrusionRule in intrusionSecurityRules"
      :security-rule="intrusionRule"
      @delete-security-rule="deleteIntrusionRule(intrusionRule)"
    />
  </div>

  <new-security-rule-popup
    v-model="popupVisible"
    @update-security-rules="getSecurityRules"
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
