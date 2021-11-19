<template>
  <v-main
    class="bgc"
  >
    <v-container
      fluid
      :class="[background.includes($route.name) ? '' : 'bg']"
    >
      <router-view :key="$route.path" />
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'DefaultView',

    data () {
      return {
        background: ['Teilnehmer'],
      }
    },
  }
</script>

<style lang="scss" scoped>
 @media screen{
    .bg {
      background: url('~@/assets/bg1.svg') no-repeat right top;
      transition: all 0s 0s ease;
    }
    .bgc {
      background-color: #eff1f7 !important;
    }
  }
</style>
