<template>
  <v-dialog
    v-model="dialog"
    height="50vh"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Öffne Turnierbeschreibung
      </v-btn>
    </template>
    <v-btn
      color="red lighten-2"
      dark
      max-width="100"
      right
      @click="dialog=false"
    >
      close
    </v-btn>
    <embed
      :key="dokument"
      :src="dokument"
    />
  </v-dialog>
</template>

<script>
  export default {
    props: {
      dokument:
        String,
      dialog:
        Boolean,
    },
  }
</script>

<style>
  .v-dialog {
    height: 100% !important;
  }
  .v-dialog > * {
    width: 100% !important;
    height: 100%;
  }
</style>
