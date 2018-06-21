<template>
  <div class="stories">
    <h2>Stories</h2>
    <label for="addStoryName">Name</label>
    <input type="text" id="addStoryName" v-model="storyName" />
    <button @click="addStory">Add</button>

    <ul>
      <li class="story" v-for="(story, index) in stories">
        <strong>{{story.uid}}</strong>
        <router-link :to="{ name: 'StoryClues', 'params': {uid: story.uid}}">Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
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
  // components: {
  //   "clue" : Clue
  // }
}
</script>

<style>
label {display: block; margin: 10px 0;}
p+ul {margin: 0 0 10px;}
</style>
