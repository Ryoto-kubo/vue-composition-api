<template>
  <div class="input_wrapper">
    <input
      class="input"
      type="text"
      @keydown="inputText"
      v-model="inputValue"
      placeholder="何をしますか？"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(props, context: SetupContext) {
    const inputValue = ref<string>('')
    const inputText = () => {
      context.emit('input-text', inputValue.value)      
    }
    return {
      inputValue,
      inputText,
    }
  },
})
</script>

<style lang="scss" scoped>
.input_wrapper {
  .input {
    width: 400px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #707070;
    box-sizing: border-box;
    outline: none;
    font-size: 20px;
    padding: 10px;
  }
}
</style>
