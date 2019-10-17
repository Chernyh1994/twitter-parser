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
              <v-row
                  align="center"
                  justify="end"
                >
                <v-btn large color="teal" icon>
                    <v-icon>mdi-vuetify</v-icon>
                </v-btn>
                <v-btn large color="with" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn large color="#B71C1C" icon>
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
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
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
      </v-col>
    </v-row>

    <Pagination />

  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Pagination from '~/components/Paginations';

  export default {
    components: {
      Pagination
    },

        computed: mapState({
      tweets: state => state.twitter.allTweets    
    }),

    methods: mapActions('twitter', [' GET_TWEETS']),
  

    mounted() {
      this.$store.dispatch('twitter/GET_TWEETS');
    }
    
  }
</script>