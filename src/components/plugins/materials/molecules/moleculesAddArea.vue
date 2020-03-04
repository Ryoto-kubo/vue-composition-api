<template>
  <div class="add_container">
    <div class="input_container">
      <atoms-input-area @input-text="inputText"/>
    </div>
    <div class="button_container">
      <atoms-add-button @add-todo="addTodo"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
export default defineComponent({
  setup(props, context: SetupContext){
    const inputText = (value: string) => {
      context.emit('input-text', value)
    }
    const addTodo = () => {
      context.emit('add-todo')
    }
    return {
      inputText,
      addTodo
    }
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
