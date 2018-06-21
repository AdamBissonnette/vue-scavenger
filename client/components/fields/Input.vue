<template>
  <div class="form_group">
    <label :for="id">{{label}}</label>
    <textarea :id="id" :value="value" @input="$emit('update:value', $event.target.value)"></textarea>
  <!--     <template v-if="type === 'text'">
        <input type="text" :value="value" @input="$emit('update:end_message', $event.target.value)" :id="id" />
      </template>
      <template v-else>
      </template>
 -->  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["id", "label", "value", "type"],
}
</script>