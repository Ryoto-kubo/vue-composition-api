<template>
  <div class="add_container">
    <div class="input_container">
      <atoms-input-area />
    </div>
    <div class="button_container">
      <atoms-add-button />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.add_container {
  width: 100%;
  max-width: 400px;
  margin: auto;
  .input_container {
    margin-bottom: 24px;
  }
  .button_container {
    text-align: left;
  }
}
</style>
