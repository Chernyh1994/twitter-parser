<template>
  <v-card
    class="ma-1 pa-7"
  >
    <span>New account</span>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        form
        @submit.prevent="ADD_USER($data)"
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
        :type="show1 ? 'text' : ''"
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
        </v-card-actions>

    </v-form>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'login',
    data() {
        return{
        show1: false,
        valid: true,
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

 computed: mapState({
    form: state => state.users.form    
  }), 

  methods:{
    ...mapActions('users', ['ADD_USER']),
    ...mapMutations('users', ['RESET_FORM'])
  }

}
</script>

