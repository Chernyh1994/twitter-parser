<template>
  <div>
    <div 
      v-masonry
      transition-duration="none"
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
      </div>
    </div>
  </div>
</template>

<script>
  import NoSSR from 'vue-no-ssr';

  export default {
    async asyncData() {
      const response = await fetch('http://localhost:5000/twitter/tweets')
      const tweets = await response.json()
      return {tweets}
    }, 

    data: () => ({
      tweets:[]
    }), 

    auth: false,
    components: {
      'no-ssr': NoSSR
    },

    mounted() {
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

