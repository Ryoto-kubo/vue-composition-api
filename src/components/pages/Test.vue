<template>
  <div>
    <h1>test</h1>
    <button @click="smapleFor">button</button>
  </div>
</template>

<script>
import axios from 'axios'
import Promise from 'bluebird'

export default {
  data() {
    return {
      testArray: [],
    }
  },
  methods: {
    smapleFor() {
      const promises = []
      for (let i = 0; i < 6; i++) {
        promises.push(this.createPromise(i))
      }
      Promise.all(promises).then(responses => {
        console.log(responses)
      })
    },
    createPromise(i) {
      return axios
        .get(
          'https://script.google.com/macros/s/AKfycbyelRmE8FAZ7qXEZO7J0WzD_wuiCwZVlxIrxLrwMLXBHiPqdHm4/exec'
        )
        .then(response => {
          const userData = response.data[i].name
          return Promise.resolve(userData)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
