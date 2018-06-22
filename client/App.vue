<template>
  <div id="app">
  	<router-link to="/">Stories</router-link>
    <router-link to="/messages">Messages</router-link>
    <router-link to="/explorer">Explorer</router-link>
  	<router-link to="/codes">Codes</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
