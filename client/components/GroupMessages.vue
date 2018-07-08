<template>
  <div class="group-messages stackable ui stories container grid">
    <lgheader title="Group Messages"></lgheader>

    <div class="four wide column">
      <h3>Filters</h3>
      <div class="ui form">
        <lginput :value.sync="searchQuery" id="query" type="text" label="User Search"></lginput>
      </div>
    </div>
    <div class="twelve wide column">

      <table class="ui red celled table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Story</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Text</th>
          </tr>
        </thead>
        <tr v-for="message in filteredBySearch">
          <td>
            {{message.sent | formatDate}}
          </td>
          <td>
            {{message.story_uid}}
          </td>
          <td>
            {{message.sender}}
          </td>
          <td>
            {{message.receiver}}
          </td>
          <td>
            {{message.text}}

            <a :href="message.media_url" target="_blank" rel="noopener" v-if="message.media_url != ''">
              <img :src="message.media_url" />
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Messages',
  data () {
    return {
      searchQuery:"",
      messages: []
    }
  },
  computed: {
    filteredBySearch: function () {
      return this.messages.filter((message) => (
        message.text.replace(' FC','').toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1
        )
      )
    }
  },
  mounted() {
    axios.get('/api/messages/group/' + this.$route.params.uid + "/")
      .then(response => {
        this.messages = response.data.data;
      })
  }
}
</script>

<style>
table img {
  width: 100%;
  margin-top: 15px;
}
</style>
