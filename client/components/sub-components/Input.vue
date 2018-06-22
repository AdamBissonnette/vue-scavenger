<template>
  <div class="field">
    <label :for="id">{{label}}</label>
      <template v-if="type === 'text'">
        <input :id="id" type="text" :value="value" @input="$emit('update:value', $event.target.value)" />
      </template>
      <template v-else>
        <textarea :id="id" :value="value" rows="2" @input="$emit('update:value', $event.target.value)"></textarea>
      </template>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["id", "label", "value", "type"],
}
</script>