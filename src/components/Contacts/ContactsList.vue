<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            v-bind="{ [`xs3`]: true }"
            v-for="card in cards"
            :key="card.title"
          >
            <v-card>
              <v-card-media
                :src="card.image"
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
                <h6>{{card.firstName}}</h6>
                <v-btn @click="deleteContact(`${card.userName}`)" icon>
                  <icon name="times"></icon>
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
  import 'vue-awesome/icons/flag'
  import 'vue-awesome/icons' 
  import Icon from 'vue-awesome/components/Icon'

  Vue.component('icon', Icon)
  export default {
    data () {
      return {
        username: '',
        User: [],
        cards: []
      }
    },
    mounted(){
        this.$store.dispatch("contactsList").then(response => {
            this.cards = response
            console.log(this.cards)
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
      onAddContact(){
        console.log("asdas")
      },
      onDismissed(){
        this.$store.dispatch('clearError')
      },
      deleteContact(name){
        this.$store.dispatch("removeContac", {userName:name}).then(response => {
        }, error => {
            console.error("Got nothing")
        })
      }
    }
  }
</script>
