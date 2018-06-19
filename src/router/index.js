import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Messages from '@/components/Messages'
import Group from '@/components/GroupMessages'
import User from '@/components/UserMessages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/messages/group/:uid/',
      name: 'Group',
      component: Group,
      props: true
    },
    {
    	path: '/messages/user/:uid/',
    	name: 'User',
    	component: User,
      props: true
    }
  ]
})
