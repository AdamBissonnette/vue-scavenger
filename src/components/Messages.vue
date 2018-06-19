<template>
  <div class="messages">
    {{msg}}
    <ul>
      <li v-for="message in sortedMessages">
        {{message.text}}, {{message.sent}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Messages',
  data () {
    return {
      msg: "I feel like I get this - here are the messages:",
      messages: [{
            "uid": "db5c08222ba14539b509a3a772512a92",
            "text": "Earlier",
            "group_uid": "E21293",
            "story_uid": "IOTLANG",
            "receiver": "messenger:2075608205815078",
            "media_url": null,
            "sent": "2018-06-07T00:28:58.677190",
            "sender": null}, 
            {"uid": "ab5c08222ba14539b509a3a772512a92",
            "text": "Later",
            "group_uid": "E21293",
            "story_uid": "IOTLANG",
            "receiver": "messenger:2075608205815078",
            "media_url": null,
            "sent": "2018-07-07T00:28:58.677190",
            "sender": null}]
    }
  },
  computed: {
    sortedMessages: function() {
      function compare(a, b) {
        return new Date(a.sent) - new Date(b.sent);
      }
      return this.messages.sort(compare);
    }
  }
  // mounted() {
  //   axios.get('https://4e42a181-6440-4b26-a848-39b7f9481286.mock.pstmn.io/messages')
  //     .then(response => {
  //       function compare(a, b) {
  //         return new Date(a.sent) - new Date(b.sent);
  //       }

  //       this.messages = response.data.data;
  //     })
  // }
}
</script>

<style scoped>
</style>
