<template>
  <div>
    <v-navigation-drawer
      v-if="ROLE"
      v-model="drawer"
      color="primary"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item v-if="ROLE" exact to="/">
          <v-list-item-action>
            <v-icon>mdi-twitter-circle mdi-light</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="white--text headline"
              v-text="'All Twitter'"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="ROLE" exact to="/user">
          <v-list-item-action>
            <v-icon>mdi-clipboard-account mdi-light</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="white--text headline"
              v-text="'Profile'"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="ROLE === 'admin'" exact to="/admin/settings">
          <v-list-item-action>
            <v-icon>mdi-google-maps mdi-light</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="white--text headline"
              v-text="'Maps of Twitter'"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="ROLE === 'admin'" exact to="/admin/tables.users">
          <v-list-item-action>
            <v-icon>mdi-account-multiple mdi-light</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text headline" v-text="'Users'" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="ROLE === 'admin'" exact to="/admin">
          <v-list-item-action>
            <v-icon>mdi-table-edit mdi-light</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="white--text headline"
              v-text="'Edit Twitter'"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="ROLE === 'admin'" exact to="/admin/add.secret">
          <v-list-item-action>
            <v-icon>mdi-key-variant mdi-light</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="white--text headline"
              v-text="'Add keys'"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="ROLE"
        class="white--text headline"
        @click.stop="drawer = !drawer"
      />
      <v-btn
        v-if="ROLE"
        class="white--text headline"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text headline" v-text="title" />
      <v-spacer />

      <div>
        <v-btn
          v-if="ROLE"
          class="ma-4"
          tile
          outlined
          color="white"
          small
          @click="logout"
        >
          Sign out
        </v-btn>
        <Nestedlists v-if="ROLE" />

        <nuxt-link v-if="!ROLE" to="/login" class="navbar-item white--text">
          Login In
        </nuxt-link>
        <v-btn
          v-if="!ROLE"
          class="ma-4"
          tile
          outlined
          color="white"
          small
          to="/login/registration"
        >
          Register
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import Nestedlists from "./Nestedlists"
import { mapGetters } from "vuex"

export default {
  components: {
    Nestedlists
  },

  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "MyTest"
    }
  },

  computed: {
    ...mapGetters("auth", { ROLE: "roleInUser" })
  },

  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push("/")
    }
  }
}
</script>
