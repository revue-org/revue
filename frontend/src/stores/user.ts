import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(true);

  function login() {
    isLoggedIn.value = true;
  }

  function logout() {
    isLoggedIn.value = false;
  }

  return { isLoggedIn, login, logout };
});
