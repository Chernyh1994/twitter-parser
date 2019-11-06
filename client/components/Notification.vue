<template>
    <v-dialog
      v-model="dialog"
      width="320"
    >
        <v-alert
          border="right"
          colored-border
          type="error"
          elevation="2"
          class="ma-0"
        >
          {{message}}
        </v-alert>
    </v-dialog>
</template>

<script>
  export default {

    data () {
      return {
      }
    },

    name: 'Notification',
    props: ['message', 'dialog'],
    
  }
</script>