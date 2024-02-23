<script setup lang="ts">
import { DeviceType, Measure } from '@domain/device/core'
import { getMeasureColor } from '@/utils/MeasureUtils'
import {
  type ExceedingRule,
  type IntrusionRule,
  ObjectClass,
  type SecurityRule
} from '@domain/security-rule/core'
import UpdateSecurityRulePopup from './UpdateSecurityRulePopup.vue'
import { ref, watch } from 'vue'
import { DeviceTypeConverter, MeasureConverter, ObjectClassConverter } from 'domain/dist/utils'
import RequestHelper, { alarmHost, alarmPort } from '@/utils/RequestHelper'
import { popDelete, popNegative, popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'

const { securityRule } = defineProps<{
  securityRule: SecurityRule
}>()

const emit = defineEmits<{
  (e: 'delete-security-rule'): void
  (e: 'get-exceeding-rules'): void
  (e: 'get-intrusion-rules'): void
}>()

const updatePopupVisible = ref<boolean>(false)
const $q = useQuasar()

const updateExceedingRule = async (exceedingRule: ExceedingRule) => {
  await RequestHelper.put(`http://${alarmHost}:${alarmPort}/security-rules/exceedings`, {
    id: exceedingRule.securityRuleId,
    deviceId: {
      type: DeviceTypeConverter.convertToString(exceedingRule.deviceId.type),
      code: exceedingRule.deviceId.code
    },
    description: exceedingRule.description,
    minValue: exceedingRule.min,
    maxValue: exceedingRule.max,
    measure: MeasureConverter.convertToString(exceedingRule.measure),
    from: exceedingRule.from.toISOString(),
    to: exceedingRule.to.toISOString(),
    contacts: exceedingRule.contactsToNotify
  })
    .then(async (res: any) => {
      popPositive($q, 'Exceeding rule updated successfully')
      emit('get-exceeding-rules')
    })
    .catch(error => {
      popNegative($q, 'Error while updating exceeding rule')
      console.log(error)
    })
}

const updateIntrusionRule = async (intrusionRule: IntrusionRule) => {
  await RequestHelper.put(`http://${alarmHost}:${alarmPort}/security-rules/intrusions`, {
    id: intrusionRule.securityRuleId,
    deviceId: {
      type: DeviceTypeConverter.convertToString(intrusionRule.deviceId.type),
      code: intrusionRule.deviceId.code
    },
    description: intrusionRule.description,
    objectClass: ObjectClassConverter.convertToString(intrusionRule.objectClass),
    from: intrusionRule.from.toISOString(),
    to: intrusionRule.to.toISOString(),
    contacts: intrusionRule.contactsToNotify
  })
    .then(async (res: any) => {
      popPositive($q, 'Intrusion rule updated successfully')
      emit('get-intrusion-rules')
    })
    .catch(error => {
      popNegative($q, 'Error while updating intrusion rule')
      console.log(error)
    })
}

const deleteSecurityRule = () => {
  popDelete($q, 'Are you sure you want to delete this security rule?', () => emit('delete-security-rule'))
}
</script>

<template>
  <div class="security-rule">
    <header>
      <div>
        <q-icon
          v-if="
            new Date(
              `1970-01-01T${securityRule.from.getHours() < 10 ? '0' + securityRule.from.getHours() : securityRule.from.getHours()}:${securityRule.from.getMinutes() < 10 ? '0' + securityRule.from.getMinutes() : securityRule.from.getMinutes()}:00.000`
            ).getTime() <=
              new Date(
                `1970-01-01T${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:00.000`
              ).getTime() &&
            new Date(
              `1970-01-01T${securityRule.to.getHours() < 10 ? '0' + securityRule.to.getHours() : securityRule.to.getHours()}:${securityRule.to.getMinutes() < 10 ? '0' + securityRule.to.getMinutes() : securityRule.to.getMinutes()}:00.000`
            ).getTime() >=
              new Date(
                `1970-01-01T${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:00.000`
              ).getTime()
          "
          name="circle"
          color="green"
          size="2em"
        />
        <q-icon v-else name="circle" color="red" size="2em" />
      </div>
      <span v-if="securityRule.deviceId.type == DeviceType.SENSOR">
        <i>{{ securityRule.deviceId.code }} -</i>
        <i
          :style="{
            color: getMeasureColor((securityRule as ExceedingRule).measure)
          }"
          >{{ Measure[(securityRule as ExceedingRule).measure] }}</i
        >
      </span>
      <span v-else>
        <i>{{ securityRule.deviceId.code }} -</i
        >{{ ObjectClass[(securityRule as IntrusionRule).objectClass] }}
      </span>
    </header>
    <ul :class="DeviceType[securityRule.deviceId.type].toLowerCase()">
      <li v-if="securityRule.deviceId.type == DeviceType.SENSOR">
        <i>min val: </i>{{ (securityRule as ExceedingRule).min }} <i>max val: </i
        >{{ (securityRule as ExceedingRule).max }}
      </li>

      <li>
        <i>Active from: </i>{{ securityRule.from.toLocaleString().split(' ')[1] }} <i>to: </i
        >{{ securityRule.to.toLocaleString().split(' ')[1] }}
      </li>
      <li>{{ securityRule.description }}</li>

      <li class="actions">
        <div>
          <q-btn color="secondary" icon="edit" @click="updatePopupVisible = true" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn color="negative" icon="delete" @click="deleteSecurityRule" />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>
  <update-security-rule-popup
    v-model="updatePopupVisible"
    :security-rule="securityRule"
    @update-exceeding-rule="updateExceedingRule"
    @update-intrusion-rule="updateIntrusionRule"
  ></update-security-rule-popup>
</template>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/quasar-variables';

header {
  height: auto;
  display: flex;
  align-items: center;

  span {
    line-height: unset;
    font-size: 20px;
  }

  svg,
  i {
    margin-right: 5px;
  }

  div > i {
    transform: scale(0.7);
  }
}

button {
  padding: 4px 8px;
}

.security-rule {
  width: 15rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 8px;
}

ul {
  @media (min-width: 576px) {
    &.sensor {
      height: 150px;
    }

    &.camera {
      height: 130px;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 25px;
  margin-left: 7px;
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 0.2rem;

    &:last-child {
      flex-direction: column;
    }

    div {
      margin-right: 5px;
    }

    &.actions {
      display: flex;
      flex-direction: row;
      justify-content: start;
      gap: 5px;
      color: white;

      i {
        font-size: 2rem;
      }

      button[name='toggle_off'] {
        background-color: $disabled;
      }

      button[name='toggle_on'] {
        background-color: $positive;
      }
    }
  }
}
</style>
