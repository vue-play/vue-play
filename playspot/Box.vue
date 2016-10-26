<template>
  <div :class="cls">
  </div>
</template>

<script>
export default {
  props: [
    'color'
  ],
  computed: {
    cls() {
      return `box ${this.color}`
    }
  }
}
</script>

<style scoped>
  .box {
    width: 80px;
    height: 80px;
    border: 1px solid black;
  }
  .red {
    background-color: red;
  }
</style>
