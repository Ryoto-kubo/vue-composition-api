<template>
  <v-container max-width="60px">
    <v-text-field
      label="What needs to be done?"
      hint="Press 'Enter' to add new To-do"
      color="purple"
      outlined
      clearable
      v-model="newTodoText"
      @keydown.enter="addTodo(newTodoText)"
    />

    <h2 class="display-1 purple--text text--darken-2">
      To-Dos:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`todos-${allCount}`">
          {{ allCount }}
        </span>
      </v-fade-transition>
    </h2>

    <v-row class="my-1" align="center">
      <strong class="mx-4 pink--text text--darken-2">
        Active: {{ activeCount }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 orange--text text--darken-2">
        Completed: {{ completedCount }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :value="progress"
        color="light-blue"
        class="mr-2"
      ></v-progress-circular>
    </v-row>

    <v-row dense>
      <v-col v-for="todo in currTodoList" :key="todo.id" cols="12">
        <todo-item :todo-item="todo" @delete="deleteTodo" />
      </v-col>
    </v-row>

    <v-bottom-navigation
      v-if="hasTodo"
      v-model="view"
      color="purple lighten-1"
      class="mt-2"
    >
      <v-btn dark>
        <span>All</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Active</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Completed</span>
        <v-icon>mdi-check-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import shortid from 'shortid'
import {
  difineComoponent,
  ref,
  computed,
  watch,
  Ref,
} from '@vue/composition-api'
import todoStorage from '../utils/storage'
import TodoItemComponent from './TodoItem.vue'
import { TodoItem, View, Colors } from '../index'

// Colorsから色をランダムに取得
// returnはstring
function getRandomColor(): string {
  const len = Object.keys(Colors).length / 2 - 1
  const num = Math.floor(Math.random() * len) + 0

  return Colors[num]
}

// ここの引数viewは<View>の型を指定している。ジェネリクスと言う。
function useTodoList(view: Ref<View>) {
  // lacalStorageにあるtododataを取得
  const todos = ref([...todoStorage.fetch])

  // activeのTodoを抽出するためtodo.doneがfalseのものだけ抽出
  const actievTodos = computed(() => {
    todos.value.filter((todo: TodoItem): boolean => !todo.done)
  })
  const completeTodos = computed(() => {
    todos.value.filter((todo: TodoItem): boolean => todo.done)
  })

  const allCount = computed(() => todos.value.length)
  const activeCount = computed(() => actievTodos.value.length)
  const completedCount = computed(() => completeTodos.value.length)
  const progress = computed(() => (completedCount.value / allCount.value) * 100)

  // TodoItemがあればtrueでbottomのナビを表示させる
  const hasTodo = computed(() => todos.value.length > 0)

  // bottomのナビ操作で画面が変わった際にmenuに応じた、TodoItemを取得
  const currTodoList = computed(() => {
    switch (view.value) {
      case View.active:
        return actievTodos.value
      case View.completed:
        return completeTodos.value
      default:
        return todos.value
    }
  })

  watch(
    todos,
    newVal => {
      todoStorage.save(newVal)
    },
    { deep: true }
  )
}
export default {}
</script>

<style></style>
