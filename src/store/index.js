import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueLocalStorage)

var urlusers = {
  url: "http://52.15.105.205/api/users/",
  auth: "http://52.15.105.205/api/users/auth/login"
};

const api = Vue.axios.create({
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ Vue.localStorage.get('token')
  }
})

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    user: {
      key: Vue.localStorage.get('key'),
      token: Vue.localStorage.get('token'),
      username: Vue.localStorage.get('username')
    },
    loading: false,
    error: null,
    userSearch: {
      image: null
    },
    userProfile:{
      image: null
    }
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user.key = payload.key
      state.user.token = payload.token
      state.user.username = payload.username
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setUserSearch (state, payload) {
      state.userSearch = payload
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({commit}) {
      //commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    //EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    

    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')

      Vue.axios.post(urlusers.url, {
          firstName: payload.firstName,
          lastName: payload.lastName,
          userName: payload.userName,
          image: payload.image,
          email: payload.email,
          password: payload.password
      }).then(
        (response) =>{
          console.log(response.data)
          /* commit('setLoading', false)
          Vue.localStorage.set('key', response.data.key)
          Vue.localStorage.set('token', response.data.token)
          Vue.localStorage.set('username', response.data.username)
          const userdata = {
            key: Vue.localStorage.get('key'),
            token: Vue.localStorage.get('token'),
            username: Vue.localStorage.get('username')
          }
          commit('setUser', userdata) */
        }
      ).catch(
        (error) =>{
          commit('setLoading', false)
          commit('setError', error.response)
          console.log(error.response)
        }
      )
    },

    //EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Vue.axios.post(urlusers.auth, {
          userName: payload.username, 
          password: payload.password
      }).then(
        (response) =>{
          commit('setLoading', false)
          Vue.localStorage.set('key', response.data.key)
          Vue.localStorage.set('token', response.data.token)
          Vue.localStorage.set('username', payload.username)
          const userdata = {
            key: Vue.localStorage.get('key'),
            token: Vue.localStorage.get('token'),
            username: Vue.localStorage.get('username')
          }
          commit('setUser', userdata)
        }
      ).catch(
        (error) =>{
          commit('setLoading', false)
          commit('setError', error.response.data.message)
          console.log(error.response.data.message)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },

    searcUser({commit}, payload){
      commit('setLoading', true)
      api.get('http://52.15.105.205/api/users/'+ payload.username).then((response) => {
          commit('setUserSearch', response.data) 
          console.log(this.state.userSearch)
          commit('setLoading', false)
      }).catch(
        (error) =>{
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    userProfile({commit}){
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          api.get('http://52.15.105.205/api/users/'+ this.state.user.username).then((response) => {
              commit('setUserProfile', response.data) 
              resolve(response.data)
          }).catch(
            (error) =>{
              commit('setError', error)
              reject(error)
              console.log(error)
            }
          )
        }, 10)
      })
    },
    logout ({commit}) {
      Vue.localStorage.remove('key')
      Vue.localStorage.remove('token')
      Vue.localStorage.remove('username')

      const userdata = {
        key: Vue.localStorage.get('key'),
        token: Vue.localStorage.get('token'),
        username: Vue.localStorage.get('username')
      }
      commit('setUser', userdata)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    userProfile (state) {
      return state.userProfile
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    searchedUser (state) {
      return state.userSearch
    }
  }
})
