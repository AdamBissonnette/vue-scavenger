<template>
  <div class="story">
    <h1>{{story.uid}}</h1>

    <lginput id="story_end_message" label="End Message" :value.sync="story.end_message"></lginput>
    <lginput id="story_default_hint" label="Default Hint" :value.sync="story.default_hint"></lginput>

    <div class="controls">
      <button @click="saveStory()">Save</button>
      <button v-show="false" @click="delStory()">Delete</button>
    </div>

    <h2>Clues</h2>
    <lginput id="clueName" label="Name" :value.sync="clueName" type="text"></lginput>
    <lginput id="clueText" label="Text" :value.sync="clueText"></lginput>
    <lginput id="clueHint" label="Hint" :value.sync="clueHint"></lginput>

    <button @click="saveClue">Save</button>

    <div class="clues">
      <ul>
        <li v-for="(clue, index) in story.clues">
          {{clue}} <button @click="editClue(index)">Edit</button>
          <button @click="delClue(index)">Delete</button>
        </li>
      </ul>
    </div>  
  </div>
</template>

<script>
import Input from '@/components/fields/Input'
export default {
  name: "StoryClues",
  data () {
    return {
      story: {
        uid: "",
        clues: []
      },
      clueText: "",
      clueName: "",
      clueHint: "",
    }
  },
  mounted() {
    axios.get('/api/stories/' + this.$route.params.uid)
    .then(response => {
      this.story = response.data.data
    })
  },
  methods: {
    saveClue: function() {
      axios.put(`/api/clues/` + this.story.uid + ':' + this.clueName.toUpperCase(), {
        uid: this.clueName.toUpperCase(),
        text:this.clueText,
        hint:this.clueHint
      })
      .then(response => {
        var uid = response.data.data.uid

        if (!this.story.clues.includes(uid))
        {
          this.story.clues.push(response.data.data.uid)          
        }

        this.clueName = ""
        this.clueText = ""
        this.clueHint = ""
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    editClue: function(index) {
      axios.get(`/api/clues/` + this.story.clues[index])
      .then(response => {
        var clue = response.data.data

        this.clueName = clue.uid.replace(this.story.uid + ":", "")
        this.clueText = clue.text
        this.clueHint = clue.hint
      })
    },
    delClue: function(index) {
      axios.delete(`/api/clues/` + this.story.clues[index])
      .then(response => {
        this.story.clues.splice(index, 1)
      })
    },
    saveStory: function() {
      axios.get(`/api/stories/` + this.story.uid)
      .then(response => {
        var gStory = response.data.data
        gStory.default_hint = this.story.default_hint
        gStory.end_message = this.story.end_message
        this.story = gStory

        axios.put(`/api/stories/` + this.story.uid, {
          uid: this.story.uid,
          default_hint: this.story.default_hint,
          end_message: this.story.end_message,
        })
        .then(response => {
          this.story = response.data.data
        })
      })
    },
    delStory: function() {
      axios.delete(`/api/stories/` + this.story.uid)
      .then(response => {
        ///EEEEEEE
      })
    }
  },
  components: {
    'lginput': Input
  }
}
</script>

<style>
label {display: block; margin: 10px 0;}
p+ul {margin: 0 0 10px;}
</style>