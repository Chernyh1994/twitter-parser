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
        <v-list-item exact >
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item exact to="/inspire">
          <v-list-item-title>Secret</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
  export default {

  }
</script>