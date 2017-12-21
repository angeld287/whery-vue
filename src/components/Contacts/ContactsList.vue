<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            v-bind="{ [`xs${card.flex}`]: true }"
            v-for="card in cards"
            :key="card.title"
          >
            <v-card>
              <v-card-media
                :src="card.src"
                height="200px"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="card.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
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
        User: [],
        cards: [
            { title: 'Pre-fab homes', src: '/static/doc-images/cards/house.jpg', flex: 6 },
            { title: 'Favorite road trips', src: '/static/doc-images/cards/road.jpg', flex: 6 },
            { title: 'Best airlines', src: '/static/doc-images/cards/plane.jpg', flex: 6 },
            { title: 'Best', src: '/static/doc-images/cards/plane.jpg', flex: 6 }
        ]
      }
    },
    mounted(){
        this.$store.dispatch("contactsList").then(response => {
            //this.User = response
            console.log(response)
        }, error => {
            console.error("Got nothing")
        })
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
        const api = Vue.axios.create({
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer '+ Vue.localStorage.get('token')
            }
        })
        api.get('http://52.15.105.205/api/users/jvolquez/contacts').then((response) => {
            console.log(response)
        }).catch(
          (error) =>{
            console.log(error)
          }
        )
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
