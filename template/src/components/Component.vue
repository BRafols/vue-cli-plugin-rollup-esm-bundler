<template>
  <div class="component">
    <p>The counter is set to <b>{{counter}}</b>.</p>
    <button @click="counter += 1">Click +1</button>
    <button @click="counter -= 1">Click -1</button>
    <button @click="counter = initCounter">Reset</button>
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
