<template>
  <div class="button_wrapper">
    <button type="button" @click="addTodo">追加する</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
export default defineComponent({
  setup(props, context: SetupContext) {
    const addTodo = () => {
      context.emit('add-todo')      
    }

    return {
      addTodo
    }
  }
})
</script>

<style lang="scss" scoped>
.button_wrapper {
  button {
    width: 100px;
    height: 40px;
    font: bold 16px 'Avenir';
    letter-spacing: 1px;
    background: #5db85c;
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 5px;
    transition: all 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
