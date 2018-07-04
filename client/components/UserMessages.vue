<template>
  <div class="user-messages ui stackable stackable stories container grid">
    <lgheader title="User Messages"></lgheader>

    <div class="four wide column">
      <h3>Filters</h3>
      <div class="ui form">
        <lginput :value.sync="textQuery" id="query" type="text" label="Text Search"></lginput>
      </div>
    </div>
    <div class="twelve wide column">
      <h3>Messages</h3>
      <table class="ui red celled fixed table">
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
      textQuery: "",
      senderQuery: "",
      messages: []
    }
  },
  computed: {
    filteredBySearch: function () {
      return this.messages.filter((message) => (
        message.text.toLowerCase().indexOf(this.textQuery.toLowerCase()) !== -1 &&
         (message.sender?message.sender:"").toLowerCase().indexOf(this.senderQuery.toLowerCase()) !== -1
        )
      )
    }
  },
  mounted() {
    axios.get('/api/messages/user/' + this.$route.params.uid + "/")
      .then(response => {
        this.messages = response.data.data;
      })
  }
}
</script>

<style scoped>
</style>
