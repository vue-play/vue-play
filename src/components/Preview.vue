<template>
  <div id="root">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created() {
      this.listenParent()
    },
    methods: {
      listenParent() {
        window.addEventListener('message', e => {
          if (e.data.type === 'UPDATE_ROUTE') {
            this.$router.replace(`/__preview${e.data.payload}`)
          }
        })
      }
    }
  }
</script>
