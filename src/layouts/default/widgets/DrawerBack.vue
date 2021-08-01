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
      <v-list-item-title class="text-h4">
        <strong class="mr-1 font-weight-black">Zurück</strong>
        <br>
        <span class="green--text">Webseite FGB</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  // Utilities
  import 'firebase/auth'
  import { authService } from '../../../Firebase/init'

  export default {
    name: 'DefaultDrawerHeader',

    data: () => ({
      icon: 'mdi-earth',
    }),

    methods: {
      back () {
        console.log('done')
        authService.logout()
        window.location.href = 'https://www.fechtgesellschaftbasel.ch/'
      },
    },
  }
</script>
