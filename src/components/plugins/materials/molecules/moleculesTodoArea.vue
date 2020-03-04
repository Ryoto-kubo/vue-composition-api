<template>
  <div class="todo_container">
    <div v-for="item in state.todoItems" :key="item.index">
      
    <p>{{item.item}}</p>
    <!-- <atoms-todo-item 
      :imte="item.item"
    /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

type Props = {
  todoItems: object
};

export default defineComponent({
  props: {
    todoItems: {
      type: Array,
      default: null
    }
  },
  
  setup(props: Props){
    const state = reactive({      
      todoItems: props.todoItems
    })
    
    return {
      state
    }
  }
  
})
</script>
