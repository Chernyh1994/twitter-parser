<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
        <v-flex>
          <!-- star card API Twitter -->
          <v-card
            max-width="544"
            class="mx-auto"
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              form
              @submit.prevent="appTwitter"  
            >
              <v-card-title>
                <span>API Twitter</span>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    autocomplete="off"
                    v-model="consumer_key"
                    label="Consumer key"
                    required
                    @click:append="show_consumer_key = !show_consumer_key"
                    :append-icon="show_consumer_key ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
                    :type="show_consumer_key ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    autocomplete="off"
                    v-model="consumer_secret"
                    label="Consumer secret"
                    required
                    @click:append="show_consumer_secret = !show_consumer_secret"
                    :append-icon="show_consumer_secret ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
                    :type="show_consumer_secret ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    autocomplete="off"
                    v-model="access_token_key"
                    label="Access token key"
                    required
                    @click:append="show_access_token_key = !show_access_token_key"
                    :append-icon="show_access_token_key ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
                    :type="show_access_token_key ? 'text' : 'password'"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    autocomplete="off"
                    v-model="access_token_secret"
                    label="Access token secret"
                    required
                    @click:append="show_access_token_secret = !show_access_token_secret"
                    :append-icon="show_access_token_secret ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
                    :type="show_access_token_secret ? 'text' : 'password'"
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
                  to='/' 
                  active-class
                >
                  Cancel
                </v-btn> 

              </v-card-title>
            </v-form>
          </v-card>
        <!-- end card API Twitter -->

        <!-- start error snackbar -->
          <Notification :message="error" v-if="snackbar"/>
        <!-- start error snackbar -->
        </v-flex>
    </v-layout> 
  </v-container>
</template>


<script>
import Notification from '~/components/Notification';

export default {
  components: {
      Notification,
  },
 
  data: () => ({
// Show API key    
    show_consumer_key: false,
    show_consumer_secret: false,
    show_access_token_key: false,
    show_access_token_secret: false,
// Outher
    valid: true,
    error: null,
    snackbar: null,
// API Twitter
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',
  }),
  
  methods:{
    async  appTwitter(e) {
      try { 
        if(this.consumer_key && this.consumer_secret && this.access_token_key && this.access_token_secret) {
          await this.$axios.post('twitter/api',{ 
            consumer_key: this.consumer_key,
            consumer_secret: this.consumer_secret,
            access_token_key: this.access_token_key,
            access_token_secret: this.access_token_secret,     
          })
          this.$router.push('/admin/settings')
        } else { this.error  = 'Fill in all the fields'
        this.snackbar = true
        }
      } catch (e) {
        this.error = e
      }
    },
  }

}
</script>
