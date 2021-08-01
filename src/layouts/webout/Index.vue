<template>
  <v-app
    class="bg"
  >
    <default-bar />

    <default-view />

    <default-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'WeboutLayout',

    components: {
      DefaultBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
      ),
      DefaultFooter: () => import(
        /* webpackChunkName: "default-footer" */
        './Footer'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
    },
  }
</script>

<style lang="scss" scoped>
  @media screen{
    .bg {
      width: 100%;
      height: 100%;
      max-width: 100vw;
      background: url('~@/assets/backgroundimg.jpeg') no-repeat center center fixed !important;
      background-size: cover;
    }
  }

  .pointer {
    cursor: pointer;
  }
</style>
