<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="Username"
                      id="username"
                      v-model="username"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="false" :loading="false">
                      Sign in
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
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
    data () {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      user () {
       // return this.$store.getters.user
      },
      error () {
       // return this.$store.getters.error
      },
      loading () {
        //return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
         // this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        Vue.axios.post(`http://localhost:8080/api/users/auth/login`, {
            userName: this.username, 
            password: this.password
        }).then((response) =>{
          console.log(response.status)
        }).catch(function (error){
          if(error.response){
            console.log(error.response)
          }
        })
        //this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onDismissed () {
        //this.$store.dispatch('clearError')
      }
    }
  }
</script>
