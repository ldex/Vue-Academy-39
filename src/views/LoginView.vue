<template>
    <div style="margin-bottom: 80px">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <p>
                <label for="username">Username:</label><br>
                <input label="Username" id="username" type="text" name="username" v-model="username" required autofocus
                autocomplete="off" />
            </p>
            <p>
            <label for="password">Password:</label><br>
            <input label="Password" id="password" type="password" name="password" required v-model="password" />
            </p>
            <p>
                <button type="submit">Login</button>
            </p>
            (You can login with username "admin" and password "admin", just using a demo API returning valid authentication tokens for any username/password combination)
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')

async function login(): Promise<void> {
    try {
        await userStore.login({
            username: username.value,
            password: password.value
        })
        router.push({ name: "admin" });
        console.log('Successfully logged in!');
    } catch (error) {
        console.error('Login failed: ', error);
    }
}
</script>

<style scoped></style>