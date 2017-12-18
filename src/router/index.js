import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import EditProfile from '@/components/User/EditProfile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuardin from './auth-guard-in'
import AuthGuardout from './auth-guard-out'
import SearchContacts from '@/components/Contacts/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuardin
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuardin
    },
    {
      path: '/editprofile',
      name: 'EditProfile',
      component: EditProfile,
      beforeEnter: AuthGuardin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: AuthGuardout
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: AuthGuardout
    },
    {
      path: '/searchcontacts',
      name: 'SearchContacts',
      component: SearchContacts,
      beforeEnter: AuthGuardin
    }
  ],
  mode: 'history'
})
