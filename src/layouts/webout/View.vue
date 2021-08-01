<template>
  <v-main>
    <v-container
      style="height: 100%"
      fluid
    >
      <router-view :key="$route.path" />
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'WeboutView',
  }
</script>

<style lang="scss" scoped>
#padding {
  padding: 0px !important;
}
</style>
