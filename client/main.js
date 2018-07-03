// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import Input from '@/components/sub-components/Input'
import Header from '@/components/sub-components/Header'
// import VueGoodTablePlugin from 'vue-good-table'
// import 'vue-good-table/dist/vue-good-table.css'
// Vue.use(VueGoodTablePlugin)
import VuejsDialog from 'vuejs-dialog'
import draggable from 'vuedraggable'
// import VueCytoscape from 'vue-cytoscape'
// import 'vue-cytoscape/dist/vue-cytoscape.css'
// Vue.use(VueCytoscape)

Vue.use(VuejsDialog)

// require('../node_modules/cytoscape/dist/cytoscape.js')
// import 'cytoscape/dist/cytoscape.js'
require('../node_modules/semantic-ui-css/semantic.min.css')
require('../node_modules/semantic-ui-css/semantic.min.js')

Vue.component('lginput', Input)
Vue.component('draggable', draggable)
Vue.component('lgheader', Header)
Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).subtract(6, 'hours').format('DD-MMM-YY hh:mm:ss')
  }
})

Vue.filter('notEmpty', function(value) {
	return value != ""
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})