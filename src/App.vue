<script setup lang="ts">

</script>

<template>
  <div id="app">
    <h1>Vue Store</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <hr />
    <footer>Copyright Vue Academy 2026</footer>
  </div>
</template>

<style scoped>
/* transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes acrossIn {
  0% { transform: translate3d(-100%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
}

@keyframes acrossOut {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(100%, 0, 0); }
}

.page-enter-active {
  animation: acrossIn .45s ease-out both;
}

.page-leave-active {
  animation: acrossOut .65s ease-in both;
}
</style>
