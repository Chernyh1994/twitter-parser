<template>
 <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="error"
    >
      {{ message }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {

    data: () => ({
      snackbar: true,
      timeout: 4000,
    }),
    name: 'Notification',
    props: ['message', 'show'],
    
  }
</script>