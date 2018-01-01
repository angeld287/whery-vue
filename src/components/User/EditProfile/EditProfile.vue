<template>
  <v-container>
    <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error"></app-alert>
        </v-flex>
    </v-layout>
    <v-layout row>
      <v-dialog v-model="dialog" persistent width="500px">
        <v-btn slot="activator" fab small>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{usuario.name}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="firstname" label="first name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="lastname" label="last name" hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="username" label="User Name" required></v-text-field>
                </v-flex>
                <v-flex xs5>
                    <v-card-media
                      :src="image"
                      height="125px"
                      contain
                    ></v-card-media>
                </v-flex>
                <v-flex>
                  <file-base64
                    v-bind:multiple="true"
                    v-bind:done="getFiles">
                  </file-base64>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn :disabled="loading" :loading="loading" color="blue darken-1" flat @click.native="dialog = false" @click="updateUser()"> 
              Save
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
  import fileBase64 from 'vue-file-base64'
  
  export default {
    props: ['user'],
    components: { 
      fileBase64
      },
    data () {
      return {
        dialog: false,
        usuario: [],
        firstname: this.user.name,
        lastname: this.user.name,
        username: this.user.userName,
        image: this.user.image,
        email: this.user.email
      }
    },
    mounted(){
        this.$store.dispatch("userProfile").then(response => {
            this.usuario = response
            console.log(this.usuario)
        }, error => {
            console.error("Got nothing")
        })
    },
    computed: {
      error () {
       return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods:{
      getFiles(files){
        //console.log(files[0].base64)
        this.image = files[0].base64
        console.log('dads'+ this.user.name)
        /* this.$store.dispatch('updateUser', {
          image: files[0].base64
        }) */
      },
      updateUser(){
        this.$store.dispatch('updateUser', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          image: this.image,
          email: this.email
        })
      }
    }
  }
</script>