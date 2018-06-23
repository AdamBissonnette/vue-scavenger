<template>
  <div :class="fieldClass">
    <label :for="id">{{label}}</label>
      <template v-if="type === 'text'">
        <input :id="id" :placeholder="placeholder" :disabled="disabled" type="text" :value="value" @input="$emit('update:value', $event.target.value)" />
      </template>
      <template v-else-if="type === 'select'">
        <select :id="id" :disabled="disabled" :value="value" @input="$emit('update:value', $event.target.value)">
          <option v-for="item in items" :value="item">{{item}}</option>
        </select>
      </template>
      <template v-else-if="type === 'checkbox'">
        <input type="checkbox" :id="id" :disabled="disabled" :value="value" @input="$emit('update:value', $event.target.checked)" />
      </template>
      <template v-else-if="type === 'textarea'">
        <textarea :id="id" :placeholder="placeholder" :value="value" :rows="fieldSize" @input="$emit('update:value', $event.target.value)"></textarea>
      </template>
      <template v-else>
        <textarea :id="id" :placeholder="placeholder" :value="value" :rows="fieldSize" @input="$emit('update:value', $event.target.value)"></textarea>
      </template>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["id", "label", "value", "type", "placeholder", "disabled", "items", "size"],

  computed: {
    fieldClass: function() {
      return (typeof disabled !== "undefined")?"field disabled":"field"
    },
    fieldSize: function() {
      return (typeof this.size !== "undefined")?this.size:2
    }
  },
  mounted() {
    // $('select.dropdown')
    //   .dropdown({
    //     onChange: function(value, text, $selectedItem) {
    //       new Vue().
    //     }
    //   })
  }
}
</script>