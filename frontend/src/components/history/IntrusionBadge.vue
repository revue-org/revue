<script setup lang="ts">
import type { Intrusion } from 'common/dist/domain/core'

defineProps<{
  intrusion: Intrusion
}>()
</script>

<template>
  <li>
    <q-icon size="28px" name="sensor_occupied" />
    <span> {{ intrusion.timestamp.toLocaleString().split(',')[0] }} </span>
    <span> Source: {{ intrusion.detection.sourceDeviceId }} </span>
    <i>
      Class:
      {{ intrusion.detection.objectClass }}
    </i>
    <span>
      <i>
        Broken rule:
        {{ intrusion.intrusionRuleId }}
      </i>
    </span>
    <span class="timestamp">Detection hour: {{ intrusion.timestamp.toLocaleString().split(' ')[1] }}</span>
  </li>
</template>

<style scoped lang="scss">
.timestamp {
  font-size: 0.7rem;
  margin-left: auto;
}

li {
  list-style: none;
  width: 100%;
  border: #00acc1 1px solid;
  border-radius: 5px;
  background: #eeeeee;
  padding: 10px;
  margin: 10px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  div.measures {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    @media screen and (max-width: 576px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  h3 {
    flex-basis: 200px;
    line-height: 1;

    @media screen and (max-width: 576px) {
      flex-basis: 100px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .timestamp {
      font-size: 0.7rem;
      color: gray;
    }
  }
}
</style>
