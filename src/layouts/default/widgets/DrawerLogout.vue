<template>
  <v-list-item
    class="mb-0 justify-space-between pl-3 pointer"
    @click="back"
  >
    <v-list-item-icon
      class="my-2 align-self-center"
    >
      <v-icon v-text="icon" />
    </v-list-item-icon>

    <v-list-item-content class="pl-2">
      <v-list-item-title>
        Logout
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  // Utilities
  import 'firebase/auth'
  import { authService } from '../../../Firebase/init'

  export default {
    name: 'DefaultDrawerLogout',

    data: () => ({
      icon: 'mdi-logout',
    }),

    methods: {
      back () {
        console.log('done')
        authService.logout()
        this.$router.push('/start/')
      },
    },
  }
</script>
