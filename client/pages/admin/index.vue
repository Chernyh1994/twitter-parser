<template>
  <div>
    <no-ssr>
      <div 
        v-masonry 
        transition-duration="3s" 
        item-selector=".item" 
        class="masonry-container"
      >
        <div
          v-masonry-tile 
          class="item" 
          :key="index" 
          v-for="(tweet, index) in tweets"
        >
          <v-card
            class="ma-3 pa-3"
            color="#26c6da"
            dark
          >
            <v-row
              align="center"
              justify="end"
            >
              <v-btn
                large
                color="with"
                icon
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                large
                color="#B71C1C" 
                icon 
                @click="REMOVE_TWEET(tweet._id)"
              >
                <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </v-row>
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-twitter
              </v-icon>
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
                    <v-btn
                      icon
                      dark
                    >
                      <v-icon >mdi-heart</v-icon>
                    </v-btn>                  
                    <span class="subheading mr-2">{{ tweet.favoriteCount }}</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">{{ tweet.retweetCount }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </no-ssr>

    <Pagination />

  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Pagination from '~/components/Paginations';
  import NoSSR from 'vue-no-ssr';

  export default {
    components: {
      Pagination,
      'no-ssr': NoSSR
    },

    computed: {
      ...mapGetters('twitter',{tweets: 'TWEET'}),
    },

    methods:{ 
      ...mapActions('twitter', ['REMOVE_TWEET'])
    },
  
    mounted() {
      this.$store.dispatch('twitter/GET_TWEETS');
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }
    }
    
  }
</script>

<style scoped>
  .item {
    border: none;
    width: 22.5rem;
  }
  .masonry-container {
    width: 95%;
    margin: 0 auto;
  }
</style>