<script setup lang="ts">
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { onMounted, ref, toRaw } from 'vue'
import { DeviceType } from '@domain/device/core'
import type { DeviceIdFactory } from '@domain/device/factories'
import { DeviceIdFactoryImpl } from '@domain/device/factories'
import {
  type ExceedingRule,
  type IntrusionRule,
  ObjectClass,
  type SecurityRule
} from 'domain/dist/domain/security-rule/core'
import { type SecurityRuleFactory, SecurityRuleFactoryImpl } from 'domain/dist/domain/security-rule/factories'
import type { Contact } from 'domain/dist/domain/monitoring/core'
import { MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'
import RequestHelper, { authHost, authPort } from '@/utils/RequestHelper'

const { securityRule } = defineProps<{
  securityRule: SecurityRule
}>()

const emit = defineEmits<{
  (e: 'update-exceeding-rule', exceedingRule: ExceedingRule): void
  (e: 'update-intrusion-rule', intrusionRule: IntrusionRule): void
}>()

const securityRuleFactory: SecurityRuleFactory = new SecurityRuleFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

const optionsObjectClass = ref(
  Object.keys(ObjectClass)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: ObjectClassConverter.convertToObjectClass(value)
      }
    })
)

const optionsMeasure = ref(
  Object.keys(Measure)
    .filter(key => isNaN(Number(key)))
    .map(value => {
      return {
        label: value,
        value: MeasureConverter.convertToMeasure(value)
      }
    })
)

const optionsContacts: ref<{ label: string; value: string }> = ref([])

const getContacts = async () => {
  await RequestHelper.get(`http://${authHost}:${authPort}/users/aaaaaaaaaaaaaaaaaaaaaaaa`) //to put the id of the user taken from the pinia storage
    .then((res: any) => {
      optionsContacts.value = []
      for (let i = 0; i < res.data.contacts.length; i++) {
        optionsContacts.value.push({
          label: res.data.contacts[i].type + ': ' + res.data.contacts[i].value,
          value: res.data.contacts[i].value
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
}

const contacts: ref<Contact[]> = ref([])
const from: ref<Date> = ref()
const to: ref<Date> = ref()
const measure: ref<Measure> = ref(Measure.TEMPERATURE)
const objectClass: ref<ObjectClass> = ref(ObjectClass.PERSON)

const updateSecurityRule = () => {
  if (securityRule.deviceId.type == DeviceType.SENSOR) {
    const updatedExceedingRule: ExceedingRule = securityRuleFactory.createExceedingRule(
      (securityRule as ExceedingRule).min,
      (securityRule as ExceedingRule).max,
      measure.value,
      securityRule.securityRuleId,
      deviceIdFactory.createSensorId(securityRule.deviceId.code),
      securityRule.creatorId,
      toRaw(contacts.value).map((c: Contact) => {
        return {
          type: toRaw(c).label.split(':')[0],
          value: toRaw(c).value
        }
      }),
      securityRule.description,
      new Date('1970-01-01T' + from.value + ':00.000Z'),
      new Date('2030-01-01T' + to.value + ':00.000Z')
    )
    emit('update-exceeding-rule', updatedExceedingRule)
  } else if (securityRule.deviceId.type == DeviceType.CAMERA) {
    const updatedIntrusionRule: IntrusionRule = securityRuleFactory.createIntrusionRule(
      objectClass.value,
      securityRule.securityRuleId,
      deviceIdFactory.createCameraId(securityRule.deviceId.code),
      securityRule.creatorId,
      toRaw(contacts.value).map((c: Contact) => {
        return {
          type: toRaw(c).label.split(':')[0],
          value: toRaw(c).value
        }
      }),
      securityRule.description,
      new Date('1970-01-01T' + from.value + ':00.000Z'),
      new Date('2030-01-01T' + to.value + ':00.000Z')
    )
    emit('update-intrusion-rule', updatedIntrusionRule)
  }
}

onMounted(async () => {
  await getContacts()
})
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Update Security Rule</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Code</label>
        <q-input v-model="securityRule.deviceId.code" label="Device code" disabled="" />
      </q-card-section>
      <div v-if="securityRule.deviceId.type == DeviceType.SENSOR">
        <q-option-group
          style="display: flex; flex-direction: column"
          v-model="measure"
          :options="optionsMeasure"
          type="radio"
        />
        <q-card-section class="q-pt-none">
          <label>Min tolerated value</label>
          <q-input type="number" v-model="(securityRule as ExceedingRule).min" />
          <label>Max tolerated value</label>
          <q-input type="number" v-model="(securityRule as ExceedingRule).max" />
        </q-card-section>
      </div>
      <div v-if="securityRule.deviceId.type == DeviceType.CAMERA">
        <q-option-group
          style="display: flex"
          v-model="objectClass"
          :options="optionsObjectClass"
          type="radio"
        />
      </div>
      <q-card-section>
        <label>Description</label>
        <q-input v-model="securityRule.description" label="Rule description" />
      </q-card-section>
      <q-card-section>
        <label>Contacts</label>
        <q-select
          filled
          v-model="contacts"
          multiple
          :options="optionsContacts"
          counter
          hint="Contacts to notify"
          style="width: 250px"
        />
      </q-card-section>
      <div>
        <q-card-section class="q-pt-none">
          <label>Validation From</label>
          <q-input type="time" v-model="from" />
          <label>To</label>
          <q-input type="time" v-model="to" />
        </q-card-section>
      </div>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="updateSecurityRule" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
div.resolution {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 15px;

  input {
    height: 50px !important;
  }
}
</style>
