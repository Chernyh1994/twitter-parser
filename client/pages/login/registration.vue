<template>
  <v-card
    class="ma-1 pa-7"
  >
    <span>New account</span>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="createUser"
    >

        <v-text-field
        v-model="firstName"
        label="FirstName"
        required
        ></v-text-field>

        <v-text-field
        v-model="lastName"
        label="LastName"
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
import axios from "axios";
import {server} from '../../plugins/helper'
export default {
  layout: 'login',
    data() {
        return{
        show1: false,
        valid: true,
        password: '',
        firstName: '',
        lastName: '',
        email: '',

        
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

   created() {
    this.date_user = new Date().toLocaleDateString();
  },
  methods: {
    createUser(e) {
        let userData ={}
        if(this.firstName && this.lastName && this.email && this.password) { 
             userData = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                date_user: new Date()
            };
            this.__submitToServer(userData);
        }   
    },

    __submitToServer(data) {
      axios.post(`${server.baseURL}/users/user`, data).then(data => {
    //   this.$router.push('/')
        });
        }
  }
}
</script>

