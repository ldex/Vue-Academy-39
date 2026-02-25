import { defineStore } from "pinia";
import UserService from "@/services/UserService";
import type { UserState, LoginCredentials } from "@/types";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: null,
    token: null,
  }),
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token;
    },
  },
  actions: {
    checkPreviousLogin() {
      if (UserService.isInLocalStorage()) {
        const user = UserService.getFromLocalStorage()
        this.token = user.auth_token
        this.username = user.username
      }
    },
    async login(credentials: LoginCredentials): Promise<void> {
      const data = await UserService.login(credentials);
      this.token = data.token;
      this.username = credentials.username;
      UserService.saveToLocalStorage(this.token, this.username);
    },
    logout(): void {
      this.token = null;
      this.username = null;
      UserService.logout();
    },
  },
});
