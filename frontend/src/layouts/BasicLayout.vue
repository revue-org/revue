<script setup>
import { ref } from "vue";
import ClusterTree from "@/components/ClusterTree.vue";
import { symSharpControlCamera } from "@quasar/extras/material-symbols-sharp";
import { RouterLink } from "vue-router";
import NavbarComponent from "@/components/NavbarComponent.vue";

const rightDrawerOpen = ref(false);

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <navbar-component @toggle-aside="toggleRightDrawer" />
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
