<template>
  <v-card
  class="ma-1 pa-7"
  >    
  
   <Notification :message="error" v-if="error"/>

    <span>New account</span>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      form
      method="post"
      @submit.prevent="register"
    >

      <v-text-field
        v-model="firstName"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="username"
        label="User Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 6 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-card-actions>
        <v-btn
          color="primary"
          class="mr-4"
          type="submit"
        >
          Create
        </v-btn>
        <v-btn
          color="primary"
          class="mr-4"
          to="/"
        >
          Cancel
        </v-btn>
        <div>
          Already got an account? <nuxt-link to="/login">Login</nuxt-link>
        </div>
      </v-card-actions>   

    </v-form>
  </v-card>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  layout: 'login',

  auth: false,

  components: {
    Notification,
  },

  data() {
      return{
      show1: false,
      valid: true,
      error: null,

      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',

      emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }
  },

  methods: {
    
    async register() {
      try {
          await this.$axios.post('auth/register', {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password
          })

          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password,
            },
          });

          this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  }
}
</script>

