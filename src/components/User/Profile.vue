<template>
  <v-layout class="mt-3" row justify-center>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media :src="User.image" height="300px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn dark icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
             <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
			  <v-btn fab accent slot="activator">  <!-- + User.key -->
				<v-icon left light>edit</v-icon>
			  </v-btn>
			  <v-card>
				<v-toolbar dark color="primary">
				  <v-btn icon @click.native="dialog = false" dark>
					<v-icon>close</v-icon>
				  </v-btn>
				  <v-toolbar-title>Settings</v-toolbar-title>
				  <v-spacer></v-spacer>
				  <v-toolbar-items>
					<v-btn dark flat @click.native="dialog = false">Save</v-btn>
				  </v-toolbar-items>
				</v-toolbar>
				<v-list three-line subheader>
				  <v-subheader>User Controls</v-subheader>
				  <v-list-tile avatar>
					<v-list-tile-content>
					  <v-list-tile-title>Content filtering</v-list-tile-title>
					  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
					</v-list-tile-content>
				  </v-list-tile>
				  <v-list-tile avatar>
					<v-list-tile-content>
					  <v-list-tile-title>Password</v-list-tile-title>
					  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
					</v-list-tile-content>
				  </v-list-tile>
				</v-list>
				<v-divider></v-divider>
				<v-list three-line subheader>
				  <v-subheader>General</v-subheader>
				  <v-list-tile avatar>
					<v-list-tile-action>
					  <v-checkbox v-model="notifications"></v-checkbox>
					</v-list-tile-action>
					<v-list-tile-content>
					  <v-list-tile-title>Notifications</v-list-tile-title>
					  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
					</v-list-tile-content>
				  </v-list-tile>
				  <v-list-tile avatar>
					<v-list-tile-action>
					  <v-checkbox v-model="sound"></v-checkbox>
					</v-list-tile-action>
					<v-list-tile-content>
					  <v-list-tile-title>Sound</v-list-tile-title>
					  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
					</v-list-tile-content>
				  </v-list-tile>
				  <v-list-tile avatar>
					<v-list-tile-action>
					  <v-checkbox v-model="widgets"></v-checkbox>
					</v-list-tile-action>
					<v-list-tile-content>
					  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
					  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
					</v-list-tile-content>
				  </v-list-tile>
				</v-list>
			  </v-card>
			</v-dialog>
              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
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
        <app-edit-meetup-details-dialog :user="meetup"></app-edit-meetup-details-dialog>
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
      },
      avatarSize () {
        return `${this.slider}px`
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
        console.log(object)
      },
      onDismissed(){
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
