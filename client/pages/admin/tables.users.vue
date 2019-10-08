<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
            <th class="text-left">Id</th>
            <th class="text-left">First name</th>
            <th class="text-left">Last name</th>
            <th class="text-left"> Email</th>
            <th class="text-left"> Password</th>
            <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>{{ user._id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.password }}</td>
            <td>
                <v-btn text color="error" @click="deleteUser(user._id)">
                    Delete
                </v-btn>
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import {server} from '../../plugins/helper';
import axios from "axios";
  export default {
    data () {
      return {
        users: [ ],
      }
    },
 
    created() {
        this.fetchUsers();
    },
    methods: {
    fetchUsers() {
      axios
        .get(`${server.baseURL}/users/users`)
        .then(data => (this.users = data.data));
    },
    deleteUser(id) {
      axios.delete(`${server.baseURL}/users/delete?userID=${id}`).then(data => {
        console.log(data);
        window.location.reload();
      });
    }
  }
  }
</script>