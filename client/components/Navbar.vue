<template>
    <div>
        <v-navigation-drawer
        v-if="ROLE"
        color = "primary"
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
        >
            <v-list>

                <v-list-item exact to="/" v-if="ROLE">
                    <v-list-item-action>
                        <v-icon>mdi-twitter-circle mdi-light</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text headline" v-text="'All Twitter'" />
                     </v-list-item-content>
                </v-list-item>

                <v-list-item exact to="/inspire" v-if="ROLE">
                    <v-list-item-action>
                        <v-icon>mdi-file-lock mdi-light</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text headline" v-text="'Super Secret'" />
                     </v-list-item-content>
                </v-list-item>

                <v-list-item exact to="/admin/settings" v-if="ROLE === 'admin'">
                    <v-list-item-action>
                        <v-icon>mdi-google-maps mdi-light</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text headline" v-text="'Maps of Twitter'" />
                     </v-list-item-content>
                </v-list-item>

                <v-list-item exact to="/admin/tables.users" v-if="ROLE === 'admin'">
                    <v-list-item-action>
                        <v-icon>mdi-account-multiple mdi-light</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text headline" v-text="'Users'" />
                     </v-list-item-content>
                </v-list-item>

                <v-list-item exact to="/admin" v-if="ROLE === 'admin'">
                    <v-list-item-action>
                        <v-icon>mdi-table-edit mdi-light</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text headline" v-text="'Edit Twitter'" />
                     </v-list-item-content>
                </v-list-item>                                                                
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
        color = "primary"
        :clipped-left="clipped"
        fixed
        app
        >
            <v-app-bar-nav-icon v-if="ROLE" class="white--text headline" @click.stop="drawer = !drawer" />
                <v-btn v-if="ROLE"
                class="white--text headline"
                icon
                @click.stop="miniVariant = !miniVariant"
                >
                    <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
                </v-btn>
            <v-toolbar-title class="white--text headline" v-text="title" />
            <v-spacer />
            
             <div>
              <v-btn class="ma-4" tile outlined color="white" small to="/" v-if="ROLE" @click="CLEAR_ROLE">
                Sign out
              </v-btn>
              <v-btn class="ma-4" tile outlined color="white" small to="/profil" v-if="ROLE">
                Profil
              </v-btn>
              <nuxt-link to="/auth" class="navbar-item white--text" v-if="!ROLE"> Login In </nuxt-link>
              <v-btn class="ma-4" tile outlined color="white" small to="/auth/registration" v-if="!ROLE">
                Register
              </v-btn>
            </div>

        </v-app-bar>

    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: mapGetters('users',['ROLE']),

    methods:{
      ...mapMutations('users',['CLEAR_ROLE'])
    },

  data () {
    return {
        clipped: true,
        drawer: false,
        fixed: false,
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'MyTest'
    }
  }
}
</script>