<script setup lang="ts">
import { popDelete } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import type { IntrusionRule, RangeRule, SecurityRule } from '@/domain/core/SecurityRule'
import UpdateRulePopup from '@/components/security-rule/UpdateRulePopup.vue'

const { rule } = defineProps<{
  rule: SecurityRule
}>()

const emit = defineEmits<{
  (_e: 'delete-rule'): void
  (_e: 'get-range-rules'): void
  (_e: 'get-intrusion-rules'): void
}>()
/*  */

const updatePopupVisible = ref<boolean>(false)
const $q = useQuasar()

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
      <i>{{ rule.activeOn }} - </i>
      <span v-if="rule.type == 'range'">
        {{ (rule as RangeRule).measure.type.toUpperCase() }}
      </span>
      <span v-else>
        {{ (rule as IntrusionRule).objectClass.toUpperCase() }}
      </span>
    </header>
    <ul :class="rule.type">
      <li v-if="rule.type == 'range'">
        <span>min val: </span>{{ (rule as RangeRule).min }} <span>max val: </span
        >{{ (rule as RangeRule).max }}
      </li>

      <li>
        <span>Active from: </span>{{ rule.validity.from.toLocaleString().split(' ')[1] }} <span>to: </span
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
  <update-rule-popup
    v-model="updatePopupVisible"
    :rule="rule"
    @get-range-rules="emit('get-range-rules')"
    @get-intrusion-rules="emit('get-intrusion-rules')"
  ></update-rule-popup>
</template>
<!---->
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 25px;
  margin-left: 7px;
  list-style-type: none;
  padding: 0;

  @media (min-width: 576px) {
    &.range {
      height: 150px;
    }

    &.intrusion {
      height: 130px;
    }
  }

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
