<template>
  <div id="app">
    <div class="ui menu">
      <div class="ui container">
        <div class="header item">
          Vue Scavenger
        </div>
        <router-link to="/" class="item">Stories</router-link>
        <router-link to="/messages" class="item">Messages</router-link>
        <router-link to="/explorer" class="item">Explorer</router-link>
        <router-link to="/codes" class="item">Codes</router-link>
      </div>
    </div>

    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.wrapper .ui.container.grid {
    padding: 30px 0;
}
</style>
