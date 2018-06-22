<template>
  <div class="codes">
    <h2>Codes</h2>
    <h3>Add Code</h3>
    <lginput type="text" :value.sync="story" label="Story Code" id="story_code"></lginput>
    <lginput type="text" :value.sync="quantity" label="Quantity" id="quantity"></lginput>
    <button @click="addCode">Add Codes</button>

    <h3>Code List</h3>


    <table border="1">
      <thead>
        <tr>
          <th>Story</th>
          <th>Words</th>
          <th>Used</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="code in codes">
          <td>{{code.story_uid}}</td>
          <td>{{code.word_string}}</td>
          <td>
            <template v-if="code.used">
              Used
            </template>
            <template v-else>
              Unused
            </template>
          </td>
          <td>
            <template v-if="code.single_use">
              Single Use
            </template>
            <template v-else>
              Multi Use
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Input from '@/components/sub-components/Input'
export default {
  data() {
    return {
      story: "",
      quantity: 1,
      codes: {}
    }
  },
  mounted() {
    axios.get('/api/codes/')
    .then(response => {
      this.codes = response.data.data
    })
  },
  methods: {
    addCode: function() {
      this.codes.unshift({story_uid: this.story, word_string: "", used: false, single_use: true})
    }
  },
  components: {
    'lginput': Input
  }
}
</script>