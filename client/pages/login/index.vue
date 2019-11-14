<template>
  <v-card max-width="544" class="mx-auto">
    <v-form method="post" @submit.prevent="login">
      <v-card-title>
        <v-col cols="12" md="12">
          <v-text-field v-model="username" label="User name" required />
        </v-col>
      </v-card-title>
      <v-card-title>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 6 characters"
            :rules="[rules.required, rules.min]"
            counter
            @click:append="show1 = !show1"
          />
        </v-col>
      </v-card-title>
      <v-card-actions>
        <v-btn class="ma-2" color="primary" type="submit">
          Submit
        </v-btn>
        <v-btn class="ma-2" color="primary" to="/" active-class>
          Cancel
        </v-btn>
      </v-card-actions>
      <v-card-text>
        New to Test(JSN)?
        <NuxtLink to="/login/registration">
          Create an account.
        </NuxtLink>
      </v-card-text>
    </v-form>
    <!-- start error snackbar -->
    <Notification v-if="show1" :message="error" />
    <!-- start error snackbar -->
  </v-card>
</template>

<script>
import Notification from "~/components/Notification"

export default {
  layout: "login",

  auth: false,

  components: {
    Notification
  },

  data() {
    return {
      username: "",
      password: "",
      error: null,
      show1: false,

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$router.push("/")
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
