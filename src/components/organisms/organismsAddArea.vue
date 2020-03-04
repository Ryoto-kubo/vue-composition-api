<template>
  <div>
    <molecules-add-area 
      @input-text="inputText"
      @add-todo="addTodo"
    />
    <molecules-todo-area 
      :todo-items="state.todoItems"
    />
  </div>
</template>

<script lang="ts">
interface TodoState {
  todoItems: {item: string}[];
  todoText: string;
}

import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
  setup(){
    const state = reactive<TodoState>({
      todoItems: [ { "item": "A" }, { "item": "B" } ],
      todoText: String('')
    })
    const inputText = (value: string) => {
      state.todoText = value      
    }
    const addTodo = () => {
      console.log('buutomm');
      
      // state.todoItems.set(["item": state.todoText])
    }
    return {
      state,
      inputText,
      addTodo
    }
  }
})
</script>

<style lang="scss" scoped></style>
