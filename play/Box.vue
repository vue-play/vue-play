<template>
  <div
    class="box"
    :class="{dashed: dashed, dotted: dotted}"
    :style="{color: 'white', backgroundColor: color}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['color', 'dashed', 'dotted']
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
    &.dashed {
      border-style: dashed;
    }
    &.dotted {
      border-style: dotted;
    }
  }
</style>
