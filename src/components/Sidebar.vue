<template>
  <figure class="sidebar">
    <h1><a href="https://github.com/egoist/vue-play">Play</a></h1>
    <ul v-for="(routes, component) in paths" class="paths">
      <li>
        <div class="component-name">{{ component }}</div>
        <ul>
          <li v-for="child in routes">
            <router-link :to="child.path">
              {{ child.type }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </figure>
</template>

<script>
  export default {
    computed: {
      paths() {
        return this.$store.state.toys.paths
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    margin: 0;
    width: 280px;
    background-color: #f9f9f9;
    border-right: 1px solid #e2e2e2;
    height: 100%;
    overflow: auto;
    .paths {
      margin: 0;
      list-style: none;
      padding-left: 0;
      > li {
        .component-name {
          padding: 10px;
        }
        ul {
          padding-left: 0;
          li {
            a {
              display: block;
              padding: 10px;
              text-decoration: none;
              color: #42b983;
              &:hover, &.router-link-active {
                background-color: #f0f0f0;
              }
              &.router-link-active {
                padding-left: 7px;
                border-left: 3px solid #42b983;
              }
            }
          }
        }
      }
    }
    h1 {
      margin: 0;
      font-weight: 300;
      border-bottom: 1px solid #e2e2e2;
      background-color: white;
      text-align: center;
      a {
        color: #42b983;
        text-decoration: none;
        display: block;
        padding: 10px;
      }
    }
  }
</style>
