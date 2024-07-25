<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { popNegative } from '@/scripts/Popups'
import { useQuasar } from 'quasar'
import RequestHelper, { authHost, authPort } from '@/utils/RequestHelper'
import { useUserStore } from '@/stores/user'

const $q = useQuasar()
const emit = defineEmits(['update-permissions'])

const prop = defineProps<{
  userPermissions: string[]
}>()

const permissions = ref<any>([])

const resetFields = () => {
  permissions.value = []
}

const optionsPermissions: ref<{ label: string; value: string }> = ref([])

const getPermissions = async (): Promise<void> => {
  await RequestHelper.get(`http://${authHost}:${authPort}/permissions/${useUserStore().id}`).then(
    (res: any) => {
      optionsPermissions.value = []
      res.value = []
      for (let i = 0; i < res.data.length; i++) {
        optionsPermissions.value.push({
          label: 'Room: ' + res.data[i],
          value: res.data[i]
        })
      }
    }
  )
}

const updatePermission = () => {
  if (permissions.value.length === 0) {
    popNegative($q, 'Please fill all fields')
    return
  }
  emit(
    'update-permissions',
    permissions.value.map((permission: any) => permission.value)
  )
  resetFields()
}

onMounted(() => {
  getPermissions()
  permissions.value = prop.userPermissions.map((permission: string) => {
    return {
      label: 'Room: ' + permission,
      value: permission
    }
  })
})
</script>

<template>
  <q-dialog>
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <h3 class="text-h5">Add permission</h3>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <label>Room</label>
        <q-select
          filled
          v-model="permissions"
          multiple
          :options="optionsPermissions"
          counter
          hint="Rooms"
          style="width: 250px"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup class="text-primary" />
        <q-btn flat label="OK" v-close-popup class="bg-white text-teal" @click="updatePermission" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
