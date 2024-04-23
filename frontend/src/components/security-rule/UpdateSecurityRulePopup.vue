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
} from 'domain/dist/domain/alarm-system/core'
import { type SecurityRuleFactory, SecurityRuleFactoryImpl } from 'domain/dist/domain/alarm-system/factories'
import type { Contact } from 'domain/dist/domain/monitoring/core'
import { MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'
import RequestHelper, { authHost, authPort } from '@/utils/RequestHelper'
import { useUserStore } from '@/stores/user'

const { securityRule } = defineProps<{
  securityRule: SecurityRule
}>()

const emit = defineEmits<{
  (_e: 'update-exceeding-rule', _exceedingRule: ExceedingRule): void
  (_e: 'update-intrusion-rule', _intrusionRule: IntrusionRule): void
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
  await RequestHelper.get(`http://${authHost}:${authPort}/users/${useUserStore().userId}`)
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
const from = ref<string>(securityRule.from.toLocaleString().split(' ')[1].slice(0, 5))
const to = ref<string>(securityRule.to.toLocaleString().split(' ')[1].slice(0, 5))
const measure = ref<Measure>((securityRule as ExceedingRule).measure)
const objectClass = ref<ObjectClass>((securityRule as IntrusionRule).objectClass)
const min = ref<number>((securityRule as ExceedingRule).min)
const max = ref<number>((securityRule as ExceedingRule).max)

const updateSecurityRule = () => {
  if (securityRule.deviceId.type == DeviceType.SENSOR) {
    const updatedExceedingRule: ExceedingRule = securityRuleFactory.createExceedingRule(
      parseInt(min.value.toString()),
      parseInt(max.value.toString()),
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
      new Date('1970-01-01T' + from.value.slice(0, 5) + ':00.000Z'), //from.value.includes(' ') ? from.value.split(' ')[0] :
      new Date('2030-01-01T' + to.value.slice(0, 5) + ':00.000Z') //to.value.includes(' ') ? to.value.split(' ')[0] :
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
      new Date('1970-01-01T' + from.value.slice(0, 5) + ':00.000Z'), //from.value.includes(' ') ? from.value.split(' ')[0] :
      new Date('2030-01-01T' + to.value.slice(0, 5) + ':00.000Z') //to.value.includes(' ') ? to.value.split(' ')[0] :
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
        <q-input v-model="securityRule.deviceId.code" label="Device code" disable />
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
          <q-input type="number" v-model="min" />
          <label>Max tolerated value</label>
          <q-input type="number" v-model="max" />
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
