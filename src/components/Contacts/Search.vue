<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="white" floating dense>
              <v-text-field prepend-icon="search" hide-details single-line></v-text-field>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
          </v-toolbar>
        </v-card>
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
                          <v-btn type="submit" :disabled="loading" :loading="loading">
                                  Add Contact
                                  <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                  </span>
                                </v-btn>
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
      <v-flex
            v-bind="{ [`xs3`]: true }"
            v-for="u in user"
            :key="u.title"
          >
        <v-card>
          <v-card-media
            :src="u.image"
            height="200px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline white--text" v-text="u.title"></span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-actions class="white">
            <v-spacer></v-spacer>
            <h6>{{u.firstName}}</h6>
            <v-btn @click="deleteContact(`${u.userName}`)" icon>
              <icon name="times"></icon>
            </v-btn>
          </v-card-actions>
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
        User: []
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
        User = this.$store.dispatch('searcUser', {username: this.username})
        //this.$store.dispatch('searcUser', {username: this.username})
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
