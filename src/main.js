// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'

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