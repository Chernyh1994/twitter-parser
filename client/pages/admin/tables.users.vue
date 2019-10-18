<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
            <th class="text-left">First name</th>
            <th class="text-left">Last name</th>
            <th class="text-left"> Email</th>
            <th class="text-left"> Role</th>
            <th class="text-left"> Nick Name</th>
            <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.username }}</td>
            <td>
                <v-btn text color="error" @click="REMOVE_USER(user._id)">
                  Delete
                </v-btn>
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
 
  computed: mapState({
    users: state => state.users.allUsers    
  }),
  

  mounted() {
    this.$store.dispatch('users/GET_USERS');
    // this.$store.dispatch('users/REMOVE_USER');
  }


    // methods: {
    // deleteUser(id) {
    //   axios.delete(`${server.baseURL}/users/delete?userID=${id}`).then(data => {
    //     console.log(data);
    //     window.location.reload();
    //   });
    // }
    // }
  }
</script>