<template>
  <div class="messages stackable ui stories container grid">
    <div class="one column row">
      <div class="column">
        <h2>Messages</h2>
      </div>
    </div>
    <div class="four wide column">
      <h3>Filters</h3>
      <div class="ui form">
        <lginput :value.sync="userQuery" id="query" type="text" label="User Search"></lginput>
      </div>
    </div>
    <div class="twelve wide column">
      <h3>Groups</h3>
      <table class="ui red celled fixed table">
        <thead>
          <tr>
            <th>Current Clue</th>
            <th>User</th>
            <th>Last Message</th>
            <th>Date Started</th>
            <th>Date Completed</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tr v-for="group in sortedGroups">
          <td>
            {{group.clue_uid}}
          </td>
          <td>
            <div v-for="key in group.user_keys">{{key}}</div>
          </td>
          <td>
            {{group.messaged_at | formatDate}}
          </td>
          <td>
            {{group.created_at | formatDate}}
          </td>
          <td>
            {{group.completed_at | formatDate}}
          </td>
          <td>
            <router-link class="ui button" :to="{ name: 'Group', 'params': {uid: group.uid}}">Transcript</router-link>
          </td>
        </tr>
      </table>

      <h3>Users</h3>
      <table class="ui blue celled fixed table">
        <thead>
          <tr>
            <th>User</th>
            <th>Group ID</th>
            <th>Last Message</th>
            <th>Date Started</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tr v-for="user in filteredUsersBySearch">
          <td>
            {{user.user_uid}}
          </td>
          <td>
            {{user.group_uid}}
          </td>
          <td>
            {{user.messaged_at | formatDate}}
          </td>
          <td>
            {{user.registration_date | formatDate}}
          </td>
          <td>
            <router-link class="ui button" :to="{ name: 'User', 'params': {uid: user.user_uid}}">Transcript</router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import Input from '@/components/sub-components/Input'
import axios from 'axios'
export default {
  name: 'Messages',
  data () {
    return {
      users: [{"user_uid" : "Dave"}],
      userQuery: "",
      groups: [
        {
            "uid": "38F6FC",
            "clue_uid": "TEST:START",
            "data": {},
            "user_keys": [
                "testing"
            ],
            "word_string": "assistant pen bank",
            "messaged_at": "2018-06-19T19:16:29.852822",
            "story_uid": "TEST",
            "completed_at": "2018-06-19T19:16:29.820526",
            "hints_used": 0,
            "created_at": "2017-05-27T17:01:51.180556"
        },
        {
            "uid": "5BDE77",
            "clue_uid": "TEST:START",
            "data": {},
            "user_keys": [
                "testing"
            ],
            "word_string": null,
            "messaged_at": null,
            "story_uid": "TEST",
            "completed_at": null,
            "hints_used": 0,
            "created_at": "2017-05-27T16:28:56.800255"
        }]
    }
  },
  computed: {
    sortedGroups: function () {
      function compare(b, a) {
        return new Date(a.messaged_at) - new Date(b.messaged_at);
      }
      return this.filteredGroupsBySearch.sort(compare);
    },
    filteredUsersBySearch: function () {
      return this.users.filter((user) => (
         user.user_uid.toLowerCase().indexOf(this.userQuery.toLowerCase()) !== -1
        )
      )
    },
    filteredGroupsBySearch: function () {
      return this.groups.filter((group) => (
         group.user_keys[0].toLowerCase().indexOf(this.userQuery.toLowerCase()) !== -1
        )
      )
    },
  },
  mounted() {
    axios.get('/api/groups/')
      .then(response => {
        this.groups = response.data.data;
      }),
      axios.get('/api/users/')
      .then(response => {
        this.users = response.data.data;
      })
  },
  components: {
    "lginput" : Input
  }
}
</script>
