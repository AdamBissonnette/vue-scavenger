<template>
  <div class="ui codes stackable container grid">
    <lgheader :title="'STORY : ' + story.uid">
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
    </lgheader>

    <div class="four wide column">
      <h3>Clue List</h3>
      <button class="ui icon button" @click="initClue"><i class="icon plus"></i> New Clue</button>
      <table class="ui red compact celled table">
        <thead>
          <tr>
            <th>Clue</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(clue, index) in story.clues">
            <td>{{formatUID(clue)}}</td>
            <td>
              <button class="ui icon button" @click="editClue(index)"><i class="icon edit"></i></button>
              <button class="ui icon button" @click="delClue(index)"><i class="icon trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="four wide column">
      <h3>Add / Edit Clue</h3>
      <div class="form ui">
        <lginput id="clueName" label="Name" :value.sync="clue.uid" type="text" :disabled="inClueEditMode"></lginput>
        <lginput id="clueText" label="Text" :value.sync="clue.text" size="4"></lginput>
        <lginput id="clueHint" label="Hint" :value.sync="clue.hint" size="4"></lginput>
        <lginput id="clueSender" label="Sender" :value.sync="clue.sender" type="text"></lginput>
        <lginput id="clueMedia" label="Media" :value.sync="clue.media" type="text"></lginput>
        <button class="ui button" @click="saveClue">Save</button>
      </div> 
    </div>
    <div class="four wide column">
      <h3>Answer List</h3>
      <!-- <h4>For This Clue</h4> -->
      <button class="ui icon button" @click="initAnswer"><i class="icon plus"></i> New Answer</button>
      <table class="ui red compact celled table">
        <thead>
          <tr>
            <th>Answer</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr class="answer" v-for="(answer, index) in clue.answer_uids">
            <td>{{formatUID(answer)}}</td>
            <td>
              <button class="ui icon button" @click="editAnswer(index)"><i class="icon edit"></i></button>
              <button class="ui icon button" @click="delAnswer(index)"><i class="icon trash"></i></button>
              <!-- <button class="ui icon button" click="editAnswer(index)"><i class="icon minus"></i></button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <h4>In This Story</h4>
      <table class="ui red compact celled table">
        <thead>
          <tr>
            <th>Answer</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr class="answer" v-for="(answer, index) in clue.answer_uids">
            <td>{{showUID(answer)}}</td>
            <td>
              <button class="ui icon button" click="editAnswer(index)"><i class="icon edit"></i></button>
              <button class="ui icon button" click="editAnswer(index)"><i class="icon add"></i></button>
              <button class="ui icon button" click="delAnswer(index)"><i class="icon trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <div class="four wide column">
      <h3>Add / Edit Answers</h3>
        <div class="form ui">
          <lginput id="answerName" label="Name" :value.sync="answer.uid" type="text" :disabled="clueNameUndefined||inAnswerEditMode"></lginput>
          <lginput id="answerText" label="Pattern" :value.sync="answer.pattern" type="text" :disabled="clueNameUndefined"></lginput>
          <lginput id="answerReceiver" label="Receiver" placeholder="anyone" :value.sync="answer.receiver" type="text" :disabled="clueNameUndefined"></lginput>
          <lginput id="answerMedia" label="Requires Media" :value.sync="answer.require_media" type="checkbox" :disabled="clueNameUndefined"></lginput>
          <lginput id="answerNextClue" label="Next Clue" :value.sync="answer.next_clue" type="select" :items="story.clues" :disabled="clueNameUndefined"></lginput>
          <button class="ui button" @click="saveAnswer" :disabled="clueNameUndefined">Save</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "StoryClues",
  data () {
    return {
      editingClue: false,
      editingAnswer: false,
      story: {
        uid: "",
        clues: []
      },
      clue: {},
      answer: {}
    }
  },
  computed: {
    clueNameUndefined: function() {
      return (this.clue.uid == "")?"1":null
    },
    inClueEditMode: function() {
      return (this.editingClue)?"1":null
    },
    inAnswerEditMode: function() {
      return (this.editingAnswer)?"1":null
    }
  },
  mounted() {
    axios.get('/api/stories/' + this.$route.params.uid)
    .then(response => {
      this.story = response.data.data
      this.answer.story_uid = this.story.uid
    })
    $('.ui.accordion')
      .accordion()
    this.initClue()
    this.initAnswer()
  },
  methods: {
    formatUID: function(UID) {
      return UID.replace(/.+?\:/g, "")
    },
    showSaveComplete: function() {
      this.$dialog.alert("Save Complete!")
    },
    initClue: function() {
      this.clue = {
        uid: "",
        text: "",
        hint: "",
        sender: "",
        media_url: "",
        answer_uids: []
      }
      this.editingClue = false
    },
    initAnswer: function() {
      this.answer = {
        uid: "", //story_uid:clue_uid:answer_uid
        require_media: false,
        pattern: ".*",
        story_uid: "",
        clue_uid: "",
        next_clue: "",
        receiver: ""
      }
      this.editingAnswer = false
    },
    saveClue: function() {
      this.clue.uid = this.clue.uid.toUpperCase()
      axios.put(`/api/clues/` + this.story.uid + ':' + this.clue.uid, this.clue)
      .then(response => {
        var uid = response.data.data.uid

        if (!this.story.clues.includes(uid))
        {
          this.story.clues.push(uid)          
        }

        this.editClue(-1, uid)
        this.showSaveComplete()
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    editClue: function(index, uid) {
      var target = (index == -1)?uid:this.story.clues[index]
      axios.get(`/api/clues/` + target)
      .then(response => {
        this.editingClue = true
        response.data.data.uid = this.formatUID(response.data.data.uid)
        this.clue = response.data.data
      })
    },
    delClue: function(index) {
      this.$dialog.confirm("If you delete this clue, it'll be gone forever.", {
        loader: true
          })
          .then((dialog) => {
              axios.delete(`/api/clues/` + this.story.clues[index])
              .then(response => {
                this.story.clues.splice(index, 1)
                dialog.loading(false) // stops the proceed button's loader
                dialog.close() // stops the loader and close the dialog
              })
          })
          .catch(() => {
              console.log('Delete aborted');
          });
    },
    saveAnswer: function() {
      this.answer.clue_uid = this.clue.uid
      this.answer.story_uid = this.story.uid
      this.answer.uid = this.answer.uid.toUpperCase()
      axios.put(`/api/answers/` + this.story.uid + ':' + this.clue.uid + ':' + this.answer.uid, this.answer)
      .then(response => {
        var uid = response.data.data.uid

        if (!this.clue.answer_uids.includes(uid))
        {
          this.clue.answer_uids.push(uid)          
        }

        this.editAnswer(-1, uid)
        this.showSaveComplete()
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    editAnswer: function(index, uid) {
      var target = (index == -1)?uid:this.clue.answer_uids[index]
      axios.get(`/api/answers/` + this.clue.answer_uids[index])
      .then(response => {
        this.editingAnswer = true
        response.data.data.uid = this.formatUID(response.data.data.uid)
        this.answer = response.data.data
      })
    },
    delAnswer: function(index) {
      this.$dialog.confirm("If you delete this answer, it'll be gone forever.", {
        loader: true
          })
          .then((dialog) => {
              axios.delete(`/api/answers/` + this.clue.answer_uids[index])
              .then(response => {
                this.clue.answer_uids.splice(index, 1)
                dialog.loading(false) // stops the proceed button's loader
                dialog.close() // stops the loader and close the dialog
              })
          })
          .catch(() => {
              console.log('Delete aborted');
          });
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
          this.showSaveComplete()
        })
      })
    },
    delStory: function() {
      axios.delete(`/api/stories/` + this.story.uid)
      .then(response => {
        ///EEEEEEE
      })
    }
  }
}
</script>

<style>
label {display: block; margin: 10px 0;}
p+ul {margin: 0 0 10px;}
input#clueName, input#answerName {text-transform: uppercase;}
select {
  padding: .67857143em 0.3em;
  font-size: 1em;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
  box-shadow: 0 0 0 0 transparent inset;
  transition: color .1s ease,border-color .1s ease;
}
</style>