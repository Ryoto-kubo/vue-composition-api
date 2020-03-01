<template>
  <div class="input_wrapper">
    <input
      class="input"
      type="text"
      @keydown="$emit('add-todo', state.inputValue)"
      v-model="state.inputValue"
      placeholder="何をしますか？"
    />
    {{ state.inputValue }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  data() {
    return {
      inputValue: null,
    }
  },
  setup() {
    const state = reactive<{ inputValue:  }>({
      inputValue: 'hello',
    })

    return {
      state,
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
