<template>
  <div class="ui stories stackable container grid">
    <div class="one column row">
      <div class="column">
        <h2>Stories</h2>
      </div>
    </div>
    <div class="four wide column">
      <h3>Add a Story</h3>
      <div class="ui form">
        <lginput :value.sync="storyName" id="storyName" label="Name" type="text"></lginput>
        <button class="ui button" @click="addStory">Add</button>
      </div>
    </div>
    <div class="twelve wide column">
      <h3>List of Stories</h3>
      <table class="ui red celled fixed table">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Controls
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="story item" v-for="(story, index) in stories">
            <td>
              {{story.uid}}
            </td>
            <td>
              <router-link class="ui button" :to="{ name: 'StoryClues', 'params': {uid: story.uid}}">Edit</router-link>
            </td>
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
  name: 'Stories',
  data () {
    return {
      storyName: '',
      stories: []
    }
  },
  mounted() {
    axios.get('/api/stories/')
      .then(response => {
        this.stories = response.data.data;
      })
  },
  methods: {
    addStory: function() {
      axios.put(`/api/stories/` + this.storyName.toUpperCase(), {
        uid: this.storyName.toUpperCase(),
        default_hint:""
      })
      .then(response => {
        this.stories.push(response.data.data)
        this.storyName = ""
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  components: {
    "lginput" : Input
  }
}
</script>

<style>
label {display: block; margin: 10px 0;}
p+ul {margin: 0 0 10px;}
</style>
