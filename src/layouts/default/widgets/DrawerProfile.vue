<template>
  <v-list-item
    class="mb-0 justify-space-between pl-3"
    :to="'/profile/'"
  >
    <v-list-item-avatar>
      <v-img
        :src="
          require('@/assets/user.png')"
      />
    </v-list-item-avatar>

    <v-list-item-content class="pl-2">
      <v-list-item-title class="text-h4">
        {{ firstName }} {{ nachName }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawerHeader',

    data: () => ({
      //
    }),

    computed: {
      ...get('userfirebase', [
        'infos@privat@firstName',
        'infos@privat@nachName',
      ]),
    },
  }
</script>
