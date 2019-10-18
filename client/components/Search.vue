<template>

  <v-form
  ref="form"
  v-model="valid"
  lazy-validation
  @submit.prevent="newTweet"  
  >
    <v-toolbar
    dense
    >
      <v-text-field
      v-model="keyWord"
      hide-details
      prepend-icon="mdi-key"
      single-line
      label="Key word"
      ></v-text-field>

      <v-text-field
      v-model="rad"
      prepend-icon="mdi-map-marker-radius"
      hide-details
      single-line
      label="Radius"
      ></v-text-field>

      <v-select
      v-model="count"
      prepend-icon="mdi-twitter-circle"
      :items="number_tweets"
      hide-details
      single-line
      label="Number of tweets"
      ></v-select>

      <v-btn 
      icon          
      type="submit"
      >
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>

    </v-toolbar>
  </v-form>

</template>

<script>
import {mapActions} from 'vuex';

  export default {
    data: () => ({
      valid: false,
      keyWord: '',
      rad: '',
      count: '',
      // radius: ['1km', '2km', '5km', '10km'],
      number_tweets: [1,2,5,10,50],
    }),

    methods:{
      ...mapActions(' twitter', ['ADD_TWEETS']),
      async  newTweet(e) {
        try { 
          await this.$store.dispatch('twitter/ADD_TWEETS',{ 
            q: this.keyWord,
            count: this.count, 
            geocode: this.rad,   
          })
          // this.$router.push('/')    
        } catch (e) {
          this.error = e.response.data.message
        }
      },
    }
  }
</script>