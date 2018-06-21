<template>
  <div class="stories">
    <h2>Stories</h2>
    <label for="addStoryName">Name</label>
    <input type="text" id="addStoryName" v-model="storyName" />
    <button @click="addStory">Add</button>

    <div class="story" v-for="story in stories">
      <h3>{{story.uid}}</h3>
      <label :for="story.uid + '_end_message'">End Message</label>
      <textarea :id="story.uid + '_end_message'" v-model="story.end_message"></textarea>
      <label :for="story.uid + '_default_hint'">Default Hint</label>
      <textarea :id="story.uid + '_default_hint'" v-model="story.default_hint"></textarea>
      
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
      stories: [{
            "clues": [
                "TEST:START",
                "TEST:CLUE1",
                "TEST:CLUE2",
                "TEST:CLUE3",
                "TEST:CLUE4"
            ],
            "uid": "TEST",
            "default_hint": "test",
            "end_message": "Looks like you've hit the end of the story, text 'restart' to try again!"
        },
        {
            "clues": [
                "TESTA:START",
                "TESTA:CLUE1",
                "TESTA:CLUE2",
                "TESTA:END"
            ],
            "uid": "TESTA",
            "default_hint": "test",
            "end_message": "Looks like you've hit the end of the story, text 'restart' to try again!"
        }]
    }
  },
  methods: {
    addStory: function() {
      axios.put(`http://jsonplaceholder.typicode.com/posts`, {
        body: this.postBody
      })
      .then(response => {})
      .catch(e => {
        this.errors.push(e)
      })
      this.stories.push({
            "clues": [],
            "uid": this.storyName,
            "default_hint": "",
            "end_message": ""
        })
      this.storyName = ""
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
