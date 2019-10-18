<template>
  <v-container class="grey lighten-5">
    <v-row
    justify="center"
    >
      <v-col
      v-for="tweet in tweets" :key="tweet._id"
      md="4"
      >
         <v-card
          class="ma-3 pa-3"
          color="#26c6da"
          dark
          >
            <v-card-title>
              <v-icon
              large
              left
              >
                mdi-twitter
              </v-icon>
              <span class="title font-weight-light">Twitter</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              "{{ tweet.text }}"
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    :src="tweet.profileImages" 
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ tweet.username }}</v-list-item-title>
                </v-list-item-content>

                <v-row
                align="center"
                justify="end"
                >
                  <v-icon class="mr-1">mdi-heart</v-icon>
                  <span class="subheading mr-2">{{ tweet.favoriteCount }}</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                  <span class="subheading">{{ tweet.retweetCount }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="pagination.page"
      :length="pages"
    ></v-pagination>

  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import Pagination from '~/components/Paginations';

  export default {
    // components: {
    //   Pagination
    // },

    data () {
      return {
        pagination: {},
      }
    }, 

    computed: mapState({
      tweets: state => state.twitter.allTweets,
      pages () {
        return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
      }    
    }),

    methods:{ 
    },
  

    mounted() {
      this.$store.dispatch('twitter/GET_TWEETS');
    }
 
  }
</script>

