<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img
        :alt="`${chat.login.avatar} avatar`"
        :src="chat.login.avatar"
      />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="chat.privat.firstName + ' ' + chat.privat.nachName" />
    </v-list-item-content>

    <v-list-item-action>
      <v-list-item-action-text
        v-text="getCatAndSize(chat)"
      />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  export default {
    props: {
      chat:
        Object,
    },

    methods: {
      getCatAndSize (kind) {
        return this.$store.dispatch('userfirebase/categorie', kind.privat.geburtsdatum)
      },
    },
  }
</script>

<style>

</style>
