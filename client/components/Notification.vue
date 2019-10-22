<template>
  <v-card
  class="ma-2 pa-7"
  color="red"
  > 
    <div class="notification">
        <h1 class="mdi mdi-loading mdi-spin">{{ message }}</h1>
    </div>
  </v-card>
</template>

<script>
export default {

  name: 'Notification',
  props: ['message']
}
</script>


<style scoped>
    .notification{
        text-align:center;
    }
</style>