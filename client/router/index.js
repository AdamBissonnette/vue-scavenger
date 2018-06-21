import Vue from 'vue'
import Router from 'vue-router'
import Stories from '@/components/Stories'
import StoryClues from '@/components/StoryClues'
import Messages from '@/components/Messages'
import Group from '@/components/GroupMessages'
import User from '@/components/UserMessages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Stories',
      component: Stories
    },
    {
      path: '/story/:uid',
      name: 'StoryClues',
      component: StoryClues
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
