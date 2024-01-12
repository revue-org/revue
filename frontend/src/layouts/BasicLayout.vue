<script setup>
import { ref } from 'vue'
import ClusterTree from '@/components/ClusterTree.vue'
import { symSharpControlCamera } from '@quasar/extras/material-symbols-sharp'

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon :name="symSharpControlCamera" style="font-size: 1.5em"/>
          </q-avatar>
          Revue
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      bordered
      :width="300"
      :breakpoint="600"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <cluster-tree />
        </div>
      </q-scroll-area>
    </q-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


