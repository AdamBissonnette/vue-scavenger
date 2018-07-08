<template>
  <div class="ui codes stackable container grid">
    <lgheader title="Codes"></lgheader>

    <div class="four wide column">
      <h3>Add Code</h3>
      <div class="ui form">
        <lginput type="text" :value.sync="story" label="Story Code" id="story_code"></lginput>
        <lginput type="number" :value.sync="quantity" label="Quantity" id="quantity"></lginput>
        <lginput type="text" :value.sync="note" label="Note" placeholder="Always Leave a Note" id="note"></lginput>
        <button class="ui button" @click="addCode">Add Codes</button>
      </div>

      <h3>Recent Codes</h3>
      <div class="ui segment">
        <div v-for="code in recentCodes">
          {{code.word_string}}
        </div>
      </div>

    </div>
    <div class="twelve wide column">
      <h3>Code List</h3>
      <vue-good-table :columns="columns" :rows="codes" styleClass="ui red celled fixed table"></vue-good-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      story: "",
      storyQuery: "",
      quantity: 1,
      note: "",
      codes: {},
      recentCodes: [
        {word_string: "No Recent Codes Added"}
      ],
      columns: [{
        label: 'Story',
        field: 'story_uid',
        filterOptions: {
          enabled: true
        }},
        {label: 'Code',
        field: 'word_string',
        filterOptions: {
          enabled: false
        }},
        {label: 'Used',
        field: 'used',
        type: 'boolean',
        formatFn: this.formatUsed,
        filterOptions: {
          enabled: true,
          filterDropdownItems: [
            {value: true, text: 'Used'},
            {value: false, text: 'Unused'}
          ]
        }},
        {label: 'Single Use',
        field: 'single_use',
        type: 'boolean',
        formatFn: this.formatType,
        filterOptions: {
          enabled: true,
          filterDropdownItems: [
            {value: true, text: 'Single Use'},
            {value: false, text: 'Multi Use'}
          ]
        }},
        {label: 'Date Added',
        field: 'created_at',
        formatFn: this.formatDate,
        filterOptions: {
          enabled: true
        }},
        {label: 'Note',
        field: 'note',
        filterOptions: {
          enabled: true
        }}
      ]
    }
  },
  mounted() {
    axios.get('/api/codes/?paged=false')
    .then(response => {
      this.codes = response.data.data
    })
  },
  methods: {
    addCode: function() {
      if (this.story != "")
      {
        axios.post('/admin/gen-codes?story-uid='+this.story+'&amount='+this.quantity+'&single-use=true'+'&note='+this.note)
        .then(response => {
          this.codes = response.data.concat(this.codes)
          this.recentCodes = response.data
          this.story = ""
          this.quantity = 1
          this.note = ""
        })
      }
      // this.codes.unshift({story_uid: this.story, word_string: "", used: false, single_use: true})
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).subtract(6, 'hours').format('DD-MMM-YY hh:mm:ss')
      }
    },
    formatUsed: function(value) {
      return (value)?"Used":"Unused";
    },
    formatType: function(value) {
      return (value)?"Single Use":"Multi Use";
    }
  }
}
</script>