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
      messages: [{
            "uid": "db5c08222ba14539b509a3a772512a92",
            "text": "Earlier",
            "group_uid": "E21293",
            "story_uid": "IOTLANG",
            "receiver": "messenger:2075608205815078",
            "media_url": null,
            "sent": "2018-06-07T00:28:58.677190",
            "sender": "bob"}, 
            {"uid": "ab5c08222ba14539b509a3a772512a92",
            "text": "Later",
            "group_uid": "E21293",
            "story_uid": "IOTLANG",
            "receiver": "messenger:2075608205815078",
            "media_url": null,
            "sent": "2018-07-07T00:28:58.677190",
            "sender": "Dave"}]
    }
  },
  computed: {
    filteredBySearch: function () {
      return this.messages.filter((message) => (
        message.text.toLowerCase().indexOf(this.textQuery.toLowerCase()) !== -1 &&
         message.sender.toLowerCase().indexOf(this.senderQuery.toLowerCase()) !== -1
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
