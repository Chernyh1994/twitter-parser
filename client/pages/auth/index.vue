<template>
 <v-card
    max-width="544"
    class="mx-auto"
  >
  <Notification :message="error" v-if="error"/>
  <v-form
    method="post" 
    @submit.prevent="login"  
  >
    <v-card-title>
       <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="username"
            label="User name"
            required
          ></v-text-field>
        </v-col>
    </v-card-title>
    <v-card-title>
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"

          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
    </v-card-title>
    <v-card-actions>
      <v-btn
          class="ma-2"
          color="primary"
          type="submit"
        >
          Submit
      </v-btn> 
      <v-btn
        class="ma-2"
        color="primary"
        to='/' active-class
      >
          Cancel
      </v-btn> 
    </v-card-actions>
    <v-card-text>New to Test(JSN)? <NuxtLink to='/auth/registration'> Create an account.</NuxtLink>or</v-card-text>
  </v-form>
  </v-card>
</template>


<script>
import Notification from '~/components/Notification';

export default {

  layout: 'login',

  components: {
      Notification,
  },

  data() {
    return {
      username: '',
      password: '',
      error: null,
      show1: false
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        });

        this.$router.push('/');
      } catch (e) {
        this.error = e;
      }
    },
  },
}
</script>