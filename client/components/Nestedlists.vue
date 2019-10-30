<template>
 <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="ma-4" 
          color="primary"
          dark
          v-on="on"
        >
          <v-icon >mdi-emoticon-cool mdi-light</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          exact                      
          color="rgba(0, 0, 0, .4)"

        >
          <v-list-item-icon>
            <v-icon>mdi-email-open</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item>
        
        <v-list-item
          exact               
          color="rgba(0, 0, 0, .4)"
        >
          <v-list-item-icon>
            <v-icon>mdi-fingerprint</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ user.role }}
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          exact                     
          color="rgba(0, 0, 0, .4)"
          to="/user"    
        >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-account</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ user.username }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

  export default {
 
  computed: {
    ...mapGetters('auth', {user: 'loggedInUser'}),
  },
  
}
</script>