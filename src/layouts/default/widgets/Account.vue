<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
      <v-list-item
        to="/profile/"
      >
        <v-list-item-title v-text="'Profile'" />
      </v-list-item>
      <template v-for="(p, i) in profile">
        <v-divider
          v-if="p.divider"
          :key="`divider-${i}`"
          class="mb-2 mt-2"
        />

        <v-list-item
          v-else
          :key="`item-${i}`"
        >
          <v-list-item-title v-text="p.title" />
        </v-list-item>
      </template>
      <v-list-item
        @click="$store.dispatch('app/back')"
      >
        <v-list-item-title v-text="'Log out'" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'DefaultAccount',

    data: () => ({
      profile: [
        { title: 'Settings' },
        { divider: true },
      ],
    }),
  }
</script>
