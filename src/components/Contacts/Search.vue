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
              <form @submit.prevent="onSearch">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="Write User Name"
                      id="username"
                      v-model="username"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Search
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
               <v-layout row wrap class="mt-3">
                <v-flex xs12>
                  <v-card color="cyan darken-2" class="white--text">
                    <v-container fluid grid-list-lg>
                      <v-layout row>
                        <v-flex xs7>
                          <div>
                            <div class="headline">Supermodel</div>
                            <div><h6>{{user.name}}</h6></div>
                          </div>
                        </v-flex>
                        <v-flex xs7>
                          <div class="headline">Supermodel</div>
                          <form @submit.prevent="onAddContact">
                            <v-layout row>
                              <v-flex xs12>
                                <v-btn type="submit" :disabled="loading" :loading="loading">
                                  Add Contact
                                  <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                  </span>
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </form>
                        </v-flex>
                        <v-flex xs5>
                          <v-card-media
                            :src="user.image"
                            height="125px"
                            contain
                          ></v-card-media>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
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
        username: ''
      }
    },
    computed: {
      user () {
       return this.$store.getters.searchedUser
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
         //this.$router.push('/Profile')
        }
      }
    },
    methods: {
      onSearch(){
        this.$store.dispatch('searcUser', {username: this.username})
      },
      onAddContact(){
        console.log("asdas")
      },
      onDismissed(){
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
