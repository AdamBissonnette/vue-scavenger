<template>
  <div class="messages">
    {{msg}}
    <ul>
      <li v-for="result in messages">
        {{result.title}} - {{result.abstract}}
      </li>
    </ul>
  </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
export default {
  name: 'Messages',
  data () {
    return {
      msg: "I feel like I get this - here are the messages:",
      messages: [{title: "New Message", abstract: "Rwar"}]
    }
  },
  mounted() {
    axios.get('https://ade1dd2f-be70-4975-9776-49456a772db0.mock.pstmn.io/messagest')
      .then(response => {this.messages = response.data.results})
  }
}
</script>

<style scoped>
</style>
