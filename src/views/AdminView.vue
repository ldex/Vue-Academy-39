<template>
    <div style="margin-bottom: 80px">
            <h2>Admin Page</h2>
            <div>
                Hello {{ userStore.username }}
            </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<style scoped>

</style>