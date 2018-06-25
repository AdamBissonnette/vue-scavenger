<template>
  <div class="ui stories stackable container grid">
    <lgheader title="Stories"></lgheader>
    <div class="four wide column">
      <h3>Add a Story</h3>
      <div class="ui form">
        <lginput :value.sync="storyName" id="storyName" label="Name" type="text"></lginput>
        <button class="ui button" @click="addStory">Add</button>
      </div>
    </div>
    <div class="twelve wide column">
      <h3>List of Stories</h3>
      <!-- <vue-good-table :columns="columns" :rows="stories" styleClass="ui red celled fixed table"></vue-good-table> -->
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
        <draggable v-model="stories" :element="'tbody'">
          <tr class="story item" v-for="(story, index) in stories">
            <td>
              {{story.uid}}
            </td>
            <td>
              <router-link class="ui button" :to="{ name: 'StoryClues', 'params': {uid: story.uid}}">Edit</router-link>
              <button class="ui icon button" @click="delStory(index)"><i class="icon trash"></i></button>
            </td>
          </tr>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stories',
  data () {
    return {
      storyName: '',
      stories: [],
      columns: [{
        label: 'Name',
        field: 'uid',
        filterOptions: {
          enabled: true, // enable filter for this column
          placeholder: 'Filter This Thing', // placeholder for filter input
          filterValue: '', // initial populated value for this filter
          // filterDropdownItems: [], // dropdown (with selected values) instead of text input
          // filterFn: this.columnFilterFn, //custom filter function that
          // trigger: 'enter', //only trigger on enter not on keyup 
        }
      }]
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
    },
    delStory: function(index) {
      this.$dialog.confirm("If you delete this story, it'll be gone forever.", {
        loader: true
          })
          .then((dialog) => {
              axios.delete(`/api/stories/` + this.stories[index].uid)
              .then(response => {
                this.stories.splice(index, 1)
                dialog.loading(false) // stops the proceed button's loader
                dialog.close() // stops the loader and close the dialog
              })
          })
          .catch(() => {
              console.log('Delete aborted');
          });
    }
  }
}
</script>

<style>
label {display: block; margin: 10px 0;}
p+ul {margin: 0 0 10px;}
input#storyName {text-transform: uppercase;}
</style>
