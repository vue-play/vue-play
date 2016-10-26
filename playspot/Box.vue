<template>
  <div class="box" :style="{color: 'white', backgroundColor: color}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped>
  .box {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
