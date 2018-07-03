import Vue from 'vue'
import Router from 'vue-router'
import Stories from '@/components/Stories'
import StoryClues from '@/components/StoryClues'
import StoryMap from '@/components/StoryMap'
import Messages from '@/components/Messages'
import Group from '@/components/GroupMessages'
import User from '@/components/UserMessages'
import Explorer from '@/components/Explorer'
import Codes from '@/components/Codes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Stories',
      component: Stories
    },
    {
      path: '/storymap/:uid',
      name: 'StoryMap',
      component: StoryMap
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
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: Explorer
    },
    {
    	path: '/codes',
    	name: 'codes',
    	component: Codes
    }
  ]
})
