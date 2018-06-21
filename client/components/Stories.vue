<template>
  <div class="stories">
    <h2>Stories</h2>
    <label for="addStoryName">Name</label>
    <input type="text" id="addStoryName" v-model="storyName" />
    <button @click="addStory">Add</button>

    <div class="story" v-for="(story, index) in stories">
      <h3>{{story.uid}}</h3>

      <label :for="story.uid + '_end_message'">End Message</label>
      <textarea :id="story.uid + '_end_message'" v-model="story.end_message"></textarea>
      <label :for="story.uid + '_default_hint'">Default Hint</label>
      <textarea :id="story.uid + '_default_hint'" v-model="story.default_hint"></textarea>
      
      <div class="controls">
        <button @click="saveStory(index)">Save</button>
        <button @click="delStory(index)">Delete</button>
      </div>

    </div>
  </div>
</template>

<script>
import Clue from '@/components/StoryClueLinks'
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
      })
      .catch(e => {
        this.errors.push(e)
      })
      this.storyName = ""
    },
    saveStory: function(index) {
      axios.get(`/api/stories/` + this.stories[index].uid)
      .then(response => {
        var story = response.data.data
        story.default_hint = this.stories[index].default_hint
        story.end_message = this.stories[index].end_message
        this.stories[index] = story

        axios.put(`/api/stories/` + this.stories[index].uid, {
          uid: this.stories[index].uid,
          default_hint: this.stories[index].default_hint,
          end_message: this.stories[index].end_message,
        })
        .then(response => {
          this.stories[index] = response.data.data
        })
      })
    },
    delStory: function(index) {
      axios.delete(`/api/stories/` + this.stories[index].uid)
      .then(response => {
        this.stories.splice(index, 1)
      })
    }
  },
  components: {
    "clue" : Clue
  }
}
</script>

<style>
label {display: block; margin: 10px 0;}
p+ul {margin: 0 0 10px;}
</style>
