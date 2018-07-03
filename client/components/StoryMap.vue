<template>
	<div class="ui container">
		<div id="storymap">
			<!-- <cytoscape :config.sync="config"></cytoscape> -->
		</div>
	</div>
</template>
<script>
export default {
	data() { 
		return {
			cy: {},
			story: {},
			elements: []
		}
	},
	mounted() {
	    axios.get('/api/stories/' + this.$route.params.uid)
	    .then(response => {
	      this.story = response.data.data

	      for (var i = 0; i < this.story.clues.length; i++)
	      {
	      	this.elements.push({data: {id: this.story.clues[i]}})
	      }

	      axios.get('/api/answers/story/' + this.story.uid + '/')
	      .then(response => {
	      	var answers = response.data.data

	      	for (var i = 0; i < answers.length; i++)
	      	{
	      		var answer = answers[i]
	      		this.elements.push(
	      			{data: {
	      				id: answer.uid,
	      				source: answer.clue_uid,
	      				target: answer.next_clue
	      			}}
      			)
	      	}

	      	this.initCY()
	      })
	    })
	},
	methods: {
		initCY: function () {
			var cytoscape = require('cytoscape')
			this.cy = cytoscape({
				  container: document.getElementById('storymap'),
				  elements: this.elements,
				  style: [
				    {
				      selector: 'node',
				      style: {
				        'background-color': '#666',
				        'label': 'data(id)'
				      }
				    }, {
				      selector: 'edge',
				      style: {
				        'width': 3,
				        'line-color': '#ccc',
				        'target-arrow-color': '#ccc',
				        'target-arrow-shape': 'triangle'
				      }
				    }
				  ],
				  layout: {
				    name: 'breadthfirst',
				    directed: true,
				    padding: 10
				  }
				})
			this.cy.fit()
			this.cy.$('node').on('click', function(event) {
				console.log(event)
			})
		},
		addNode: function (nid) {
			this.cy.add({data: {id: nid}})
		},
		addEdge: function (eid, esource, etarget) {
			this.cy.add({data: {id: eid, source: esource, target: etarget}})
		},
		nodeClicked: function (event) {
			console.log(event.target.id)
		}
	}
}
</script>
<style>
#storymap {
  outline: 1px solid blue;
  width: 100%;
  height: 600px;
  display: block;
}
</style>