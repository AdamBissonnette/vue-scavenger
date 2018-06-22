<template>
  <div class="ui codes stackable container grid">
    <div class="one column row">
      <div class="column">
        <h2>Codes</h2>
      </div>
    </div>
    <div class="four wide column">
      <h3>Add Code</h3>
      <div class="ui form">
        <lginput type="text" :value.sync="story" label="Story Code" id="story_code"></lginput>
        <lginput type="text" :value.sync="quantity" label="Quantity" id="quantity"></lginput>
        <button class="ui button" @click="addCode">Add Codes</button>
      </div>

<!--       <h3>Filters</h3>
      <div class="ui form">
        <lginput type="text" :value.sync="storyQuery" label="Story Name" id="story_name"></lginput>
      </div> -->
    </div>
    <div class="twelve wide column">
      <h3>Code List</h3>
      <table class="ui red celled fixed table">
        <thead>
          <tr>
            <th>Story</th>
            <th>Words</th>
            <th>Used</th>
            <th>Type</th>
            <!-- <th>Controls</th> -->
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
<!--             <td>
              <button class="ui basic button">Reset</button>
              <button class="ui basic button">Delete</button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Input from '@/components/sub-components/Input'
export default {
  data() {
    return {
      story: "",
      storyQuery: "",
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