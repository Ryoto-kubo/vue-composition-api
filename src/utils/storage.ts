import TODOS from './todos'
import { TodoItem } from '../index'

const STORAGE_KEY = 'composition_api'

export default {
  fetch: function() {
    const todos = localStorage.getItem(STORAGE_KEY)

    if (todos) {
      return JSON.parse(todos)
    } else {
      return TODOS
    }
  },

  save: function(todos: TodoItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}
