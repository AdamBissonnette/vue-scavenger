<template>
  <div class="ui explorer stackable container grid">
    <lgheader title="Explorer"></lgheader>

    <div class="four wide column">
      <h3>Controls</h3>
      <div class="ui form">
        <lginput id="sender" label="Sender" :value.sync="from" type="text"></lginput>
        <lginput id="receiver" label="Receiver" :value.sync="to" type="text"></lginput>
        <lginput id="Media_Url" label="Media Url" :value.sync="media" type="text"></lginput>
        <lginput id="Text" label="Text" :value.sync="text"></lginput>
        <button class="ui button" @click="submit">Send</button>
      </div>
    </div>
    <div class="twelve wide column">
      <h3>Exploration Results</h3>
      <table class="ui red celled fixed table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Text</th>
            <th>Media</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="message in messages">
            <td>{{message.sender}}</td>
            <td>{{message.receiver}}</td>
            <td>{{message.text}}</td>
            <td>
              <img :src="message.image" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Explorer",
  data() {
    return {
      from: "tester",
      to: "server",
      text: "",
      media: "",
      messages: []
    }
  },
  methods: {
    submit: function() {
      var formData = new FormData()

      formData.set('From', this.from)
      formData.set('To', this.to)
      formData.set('Body', this.text)

      if (this.media !== "")
      {
        formData.set("MediaUrl0", this.media)
        formData.set("NumMedia", 1)
      }

      this.addMessage(this.to, this.from, this.text, this.media)

      axios({
        method: "post",
        url: "/twilio",
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(response => {
        var xmlDoc = new DOMParser().parseFromString(response.data, "text/xml")
        var receiver = xmlDoc.getElementsByTagName("Message")[0].getAttribute("to")
        var body = xmlDoc.getElementsByTagName("Body")[0].innerHTML
        var media_url = xmlDoc.getElementsByTagName("Media")[0]
        var media_url = (typeof media_url !== "undefined"?media_url.innerHTML:"")
        this.addMessage("", receiver, body, media_url)
      })
    },
    addMessage: function (from, to, body, media){
      this.messages.unshift({
        sender: from,
        receiver: to,
        text: body,
        image: media
      })
    }
  }
}
</script>
<style>
table img {
  width: 100%;
  margin-top: 15px;
}
</style>