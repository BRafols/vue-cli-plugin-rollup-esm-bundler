<template>
  <div class="component">
    <p>The counter is set to <b>{{counter}}</b>.</p>
    <button @click="increment">Click +1</button>
    <button @click="decrement">Click -1</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
export default {
  name: '<%- componentNamePascal %>',
  data() {
    return {
      counter: 5,
      initCounter: 5
    }
  },
  methods: {
    increment() {
      this.$store.dispatch('module_name/INCREMENT')
    },
    decrement() {
      this.$store.dispatch('module_name/DECREMENT')
    },
    reset() {
      this.$store.dispatch('module_name/RESET')
    }
  }
}
</script>

<style scoped>
.component {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}
.component p {
  margin: 0 0 1em;
}
</style>
