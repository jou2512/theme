<template>
  <v-list-item
    class="mb-0 justify-space-between pl-3"
    :to="'/components/profile/'"
  >
    <v-list-item-avatar>
      <v-img
        :src="
          require('@/assets/user.png')"
      />
    </v-list-item-avatar>

    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h4">
        {{ name[0] }} {{ name[1] }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  // Utilities
  import 'firebase/auth'
  import db, { authService } from '../../../Firebase/init'

  export default {
    name: 'DefaultDrawerHeader',

    data: () => ({
      name: [],
    }),

    mounted: function () {
      this.getName()
    },

    methods: {
      getName () {
        authService.authenticated().then(() => {
          const cityRef = db.collection('users').doc(authService.user.uid)
          cityRef.get().then((doc) => {
            console.log(doc.data().privat.firstName, doc.data().privat.nachName)
            this.name = [doc.data().privat.firstName, doc.data().privat.nachName]
          })
        })
      },
    },
  }
</script>
