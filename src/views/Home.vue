<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from '@/components/pages/HelloWorld'
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 980px;
  margin: auto;
  padding-top: 64px;
}
</style>
