<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
        <v-flex>
        <v-card
            max-width="544"
            class="mx-auto"
        >
        <Notification :message="error" v-if="error"/>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="appTwitter"  >
            <v-card-title>
                <span>API Twitter</span>
                <v-col
                    cols="12"
                    md="12"
                    >
                    <v-text-field
                      v-model="consumer_key"
                      label="Consumer key"
                      required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="12"
                    >
                    <v-text-field
                      v-model="consumer_secret"
                      label="Consumer secret"
                      required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="12"
                    >
                    <v-text-field
                      v-model="access_token_key"
                      label="Access token key"
                      required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="12"
                    >
                    <v-text-field
                      v-model="access_token_secret"
                      label="Access token secret"
                      required
                    ></v-text-field>
                </v-col>
                <v-btn
                    class="ma-2"
                    color="primary"
                    type="submit"
                    >
                    Submit
                </v-btn> 
                <v-btn
                    class="ma-2"
                    color="primary"
                    to='/' active-class
                >
                    Cancel
                </v-btn> 
            </v-card-title>
        </v-form>
        </v-card>
      </v-flex>
    </v-layout> 
  </v-container>
</template>


<script>
import {mapActions} from 'vuex';
import Notification from '~/components/Notification';

export default {

  data: () => ({
    valid: false,
    error: null,
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',   
  }),
  
  methods:{
    ...mapActions('apikeys',['API_TWITTER']),
    async  appTwitter(e) {
      try { 
        await this.$store.dispatch('apikeys/API_TWITTER',{ 
          consumer_key: this.consumer_key,
          consumer_secret: this.consumer_secret,
          access_token_key: this.access_token_key,
          access_token_secret: this.access_token_secret,     
        })
        // this.$router.push('/')
      } catch (e) {
        // this.error = e.response.data.message
      }
    },
  }

}
</script>