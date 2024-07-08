<script setup lang="ts">
import { popDelete } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import type { IntrusionRule, RangeRule, SecurityRule } from '@/domain/core/SecurityRule'

const { rule } = defineProps<{
  rule: SecurityRule
}>()

const emit = defineEmits<{
  (_e: 'delete-rule'): void
}>()

const updatePopupVisible = ref<boolean>(false)
const $q = useQuasar()

/*const updateExceedingRule = async (exceedingRule: ExceedingRule) => {
  await RequestHelper.put(`http://${alarmHost}:${alarmPort}/security-rules/exceedings`, {
    id: exceedingRule.securityRuleId,
    deviceId: {
      type: DeviceTypeConverter.convertToString(exceedingRule.deviceId.type),
      code: exceedingRule.deviceId.code
    },
    description: exceedingRule.description,
    min: exceedingRule.min,
    max: exceedingRule.max,
    measure: MeasureConverter.convertToString(exceedingRule.measure),
    from: exceedingRule.from.toISOString(),
    to: exceedingRule.to.toISOString(),
    contacts: exceedingRule.contactsToNotify
  })
    .then(async (_res: any) => {
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
    .then(async (_res: any) => {
      popPositive($q, 'Intrusion rule updated successfully')
      emit('get-intrusion-rules')
    })
    .catch(error => {
      popNegative($q, 'Error while updating intrusion rule')
      console.log(error)
    })
}*/

const deleteRule = () => {
  popDelete($q, 'Are you sure you want to delete this security rule?', () => emit('delete-rule'))
}
</script>

<template>
  <div class="security-rule">
    <header>
      <div>
        <q-icon
          v-if="rule.validity.from < new Date() && rule.validity.to > new Date()"
          name="circle"
          color="green"
          size="2em"
        />
        <q-icon v-else name="circle" color="red" size="2em" />
      </div>
      <span>{{ rule.activeOn }} -</span>
      <span v-if="rule.type == 'range'">
        {{ (rule as RangeRule).measure.type.toUpperCase() }}
      </span>
      <span v-else>
        {{ (rule as IntrusionRule).objectClass.toUpperCase() }}
      </span>
    </header>
    <ul :class="rule.type">
      <li v-if="rule.type == 'outlier'">
        <span>min val: </span>{{ (rule as RangeRule).min }} <span>max val: </span
        >{{ (rule as RangeRule).max }}
      </li>

      <li>
        <i>Active from: </i>{{ rule.validity.from.toLocaleString().split(' ')[1] }} <i>to: </i
        >{{ rule.validity.to.toLocaleString().split(' ')[1] }}
      </li>
      <li>{{ rule.description }}</li>

      <li class="actions">
        <div>
          <q-btn color="secondary" icon="edit" @click="updatePopupVisible = true" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn color="negative" icon="delete" @click="deleteRule" />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>
  <!--  <update-security-rule-popup
      v-model="updatePopupVisible"
      :security-rule="securityRule"
      @update-exceeding-rule="updateExceedingRule"
      @update-intrusion-rule="updateIntrusionRule"
    ></update-security-rule-popup>-->
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
    &.outlier {
      height: 150px;
    }

    &.intrusion {
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
