<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RequestHelper, { authHost } from '@/utils/RequestHelper'
import { useUserStore } from '@/stores/user'
import PermissionBadge from '@/components/admin/PermissionBadge.vue'
import { popPositive } from '@/scripts/Popups'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const locations = ref<string[]>([])
const newRoom = ref<string>('')

const getLocations = async (): Promise<void> => {
  await RequestHelper.get(`http://${authHost}/permissions/${useUserStore().id}`).then(
    (res: any) => {
      locations.value = []
      res.value = []
      for (let i = 0; i < res.data.length; i++) {
        locations.value.push(res.data[i])
      }
    }
  )
}

const addPermission = async (): Promise<void> => {
  if (newRoom.value.length == 0) {
    return
  }
  await RequestHelper.post(`http://${authHost}/permissions/${useUserStore().id}`, {
    permissions: [newRoom.value]
  }).then(() => {
    popPositive($q, 'Permission added successfully')
    getLocations()
    newRoom.value = ''
  })
}

const removePermission = async (permission: string): Promise<void> => {
  await RequestHelper.delete(
    `http://${authHost}/permissions/${useUserStore().id}?permissions=${permission}`
  ).then(() => {
    popPositive($q, 'Permission removed successfully')
    getLocations()
    newRoom.value = ''
  })
}

onMounted(() => {
  getLocations()
})
</script>

<template>
  <div class="container-insertion">
    <div class="users-list">
      <h2>Locations:</h2>
      <ol>
        <li>
          <div class="permission">
            <q-input v-model="newRoom" label="Room" />
            <q-btn color="primary" label="Add" @click="addPermission" />
          </div>
        </li>
        <permission-badge
          v-for="(location, index) in locations"
          :key="index"
          :permission="location"
          @delete-permission="removePermission(location)"
          :deletable="true"
        />
      </ol>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import 'src/assets/variables.scss';

.container-insertion {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  padding: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .users-list {
    ol {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .permission {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
  }

  div.buttons,
  div.roles {
    margin: 10px;
  }
}
</style>
