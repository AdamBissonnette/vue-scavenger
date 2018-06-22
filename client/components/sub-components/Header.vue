<template>
  <div class="one column row">
    <div class="column">
      <h2>{{title}}</h2>
      <span></span>
    </div>
    <div class="column">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["title"]
}
</script>