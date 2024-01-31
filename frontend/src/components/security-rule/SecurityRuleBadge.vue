<script setup lang="ts">
import { DeviceType, Measure } from '@domain/device/core'
import { getMeasureColor } from '@/utils/MeasureUtils'
import {
  type ExceedingRule,
  type IntrusionRule,
  ObjectClass,
  type SecurityRule
} from '@domain/security-rule/core'

defineProps<{
  securityRule: SecurityRule
}>()

defineEmits<{
  (e: 'delete-security-rule'): void
}>()
</script>

<template>
  <div class="security-rule">
    <header>
      <div>
        <q-icon
          v-if="
            securityRule.from.getHours() <= new Date().getHours() &&
            securityRule.to.getHours() >= new Date().getHours()
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
          <q-btn color="secondary" icon="edit" />
          <q-tooltip :offset="[0, 8]">Edit</q-tooltip>
        </div>
        <div>
          <q-btn color="negative" icon="delete" @click="$emit('delete-security-rule')" />
          <q-tooltip :offset="[0, 8]">Delete</q-tooltip>
        </div>
      </li>
    </ul>
  </div>
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
