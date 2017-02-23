<template>
  <p>This component is <strong v-if="!enabled">not</strong> using Vuex</p>
</template>

<script>
  export default {
    computed: {
      enabled() {
        return (this.$store.state.enabled === true && this.$store.getters.isAlive === true) ? true : false
      }
    }
  }
</script>
