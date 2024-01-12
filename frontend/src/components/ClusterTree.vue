<script setup>
import { ref } from 'vue'

const filter = ref('')
const filterRef = ref(null)

const simple = ref([
  {
    label: 'Revue cluster',
    children: [
      {
        label: 'Devices',
        children: [
          {
            label: 'Cameras',
            children: [
              { label: 'Canon' },
              { label: 'Nikon' },
              { label: 'Sony' }
            ]
          },
          {
            label: 'Sensors',
            children: [
              { label: 'Canon' },
              { label: 'Nikon' },
              { label: 'Sony' }
            ]
          },
        ]
      },
      {
        label: 'Recognizing nodes',
        disabled: true,
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' }
        ]
      }
    ]
  }
])

const resetFilter = () => {
  filter.value = ''
  filterRef.value.focus()
}
</script>


<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input ref="filterRef" filled v-model="filter" label="Filter">
      <template v-slot:append>
        <q-icon
          v-if="filter !== ''"
          name="clear"
          class="cursor-pointer"
          @click="resetFilter"
        />
      </template>
    </q-input>

    <q-tree
      :nodes="simple"
      node-key="label"
      :filter="filter"
      default-expand-all
    />
  </div>
</template>
