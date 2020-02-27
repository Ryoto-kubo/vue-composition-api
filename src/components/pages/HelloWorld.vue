<template>
  <div>
    <atoms-title-text />
    <div>
      <organisms-add-area />
    </div>
  </div>
</template>

<script>
import OrganismsAddArea from '@/components/organisms/organismsAddArea.vue'
export default {
  components: {
    OrganismsAddArea,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
h1 {
  color: #707070;
}
</style>
