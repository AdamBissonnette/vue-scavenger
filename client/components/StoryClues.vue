<template>
  <div class="ui codes stackable container grid">
    <div class="one column row">
      <div class="column">
        <h2>STORY : {{story.uid}}</h2>
        <div class="ui styled fluid accordion">
          <div class="title">
            <i class="dropdown icon"></i>
            Story Settings
          </div>
          <div class="content">
            <div class="ui form">
              <lginput id="story_end_message" label="End Message" :value.sync="story.end_message"></lginput>
              <lginput id="story_default_hint" label="Default Hint" :value.sync="story.default_hint"></lginput>
              <button class="ui button" @click="saveStory()">Save</button>
              <button class="ui button" v-show="false" @click="delStory()">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="four wide column">
      <h3>Add / Edit Clue</h3>
      <div class="form ui">
        <lginput id="clueName" label="Name" :value.sync="clueName" type="text"></lginput>
        <lginput id="clueText" label="Text" :value.sync="clueText"></lginput>
        <lginput id="clueHint" label="Hint" :value.sync="clueHint"></lginput>
        <button class="ui button" @click="saveClue">Save</button>
      </div>
    </div>
    <div class="twelve wide column">
      <h3>Clue List</h3>
      <table class="ui red celled fixed table">
        <thead>
          <tr>
            <th>Clue</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(clue, index) in story.clues">
            <td>{{clue}}</td>
            <td>
              <button class="ui button" @click="editClue(index)">Edit</button>
              <button class="ui button" @click="delClue(index)">Delete</button>
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