<template>
  <div class="add_container">
    <div class="input_container">
      <atoms-input-area @add-todo="addTodo" />
    </div>
    <div class="button_container">
      <atoms-add-button />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
  methods: {
    addTodo(value) {
      console.log(value)
    },
  },
})
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
