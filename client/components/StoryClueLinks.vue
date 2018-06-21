<template>
<div class="clue">
  <p><strong>Clues</strong></p>
  <ul>
    <li v-for="clue in clues">
      <router-link :to="'/story/clue/' + clue">{{clue}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Clue',
  data : {
    clues: []
  },
  props: ['clues'],
  computed: {
    sortedClues: function() {
      return clues
    }
  }
}