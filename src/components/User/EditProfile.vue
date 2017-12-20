<template>
  <v-layout row class="mt-3">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media :src="User.image" height="300px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn dark icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>
            <v-spacer></v-spacer>
           <!--  <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">Ali Conners</div>
            </v-card-title> -->
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <!-- <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>(650) 555-1234</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile> -->
          <!-- <v-list-tile @click="">
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>(323) 555-6789</v-list-tile-title>
              <v-list-tile-sub-title>Work</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>chat</v-icon>
            </v-list-tile-action>
          </v-list-tile> -->
        <!-- <v-divider inset></v-divider> -->
          <v-list-tile @click="">
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{User.name}}</v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{User.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">fa-lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{User.userName}}</v-list-tile-title>
              <v-list-tile-sub-title>User Name</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  
  Vue.use(VueAxios, axios)
  export default {
    name: 'user',
    data () {
      return {
        User: []
      }
    },
    mounted(){
        const api = Vue.axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.$store.state.user.token
            }
        })
        
        api.get('http://52.15.105.205/api/users/aangeles28').then((response) => {
            console.log(response.data)
            this.User = response.data
            console.log(this.User)
        })
    },

    computed: {
      user () {
       return this.$store.getters.user
      },
      error () {
       return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
         this.$router.push('/Profile')
        }
      }
    },
    methods: {
      onDismissed(){
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
