<template>
  <v-container>
    <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media :src="User.image" height="300px">
            <v-layout column class="media">
              <v-card-title>
                <!-- <v-btn dark icon>
                  <v-icon>chevron_left</v-icon>
                </v-btn> -->
                <v-spacer></v-spacer>
                <app-edit-profile :user="user"></app-edit-profile>
                <!-- <v-btn dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn> -->
              </v-card-title>
              <v-spacer></v-spacer>
            </v-layout>
          </v-card-media>
          <v-list two-line>
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
  </v-container>
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
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        User: [],
        email: '',
        image: '',
        key: '',
        name: '',
        userName: ''
      }
    },
    mounted(){
        this.$store.dispatch("userProfile").then(response => {
            this.User = response
        }, error => {
            console.error("Got nothing")
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
      onSearchProfile(){
        var object = this.$store.dispatch('userProfile')
        //console.log(object)
      },
      onDismissed(){
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
