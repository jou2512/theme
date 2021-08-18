<template>
  <v-app-bar
    id="default-app-bar"
    app
    absolute
    class="v-bar--underline"
    color="#2E7D32"
    clipped-left
    height="130"
    flat
  >
    <v-row
      justify="center"
      align="center"
      style="max-height: 130px"
    >
      <v-col>
        <v-container
          class="d-flex justify-center"
        >
          <a
            class="text-xl-h2 text-lg-h3 text-md-h3 text-sm-h3 text-h4 d-flex font-weight-bold"
            style="color: black; text-decoration: none"
            href="https://www.fechtgesellschaftbasel.ch/"
          >
            Fechtgesellschaft Basel
          </a>
        </v-container>
      </v-col>
      <v-col
        style="padding-top: 0px"
      >
        <v-container
          class="d-flex justify-center"
          style="padding-top: 0px"
        >
          <v-img
            contain
            aspect-ratio="1/1"
            height="120"
            max-width="400"
            src="~@/assets/fgblogo.png"
            style="mix-blend-mode: lighten; opacity: 0.56"
          />
        </v-container>
      </v-col>
      <v-col
        v-if="this.$route.params.id == null "
      >
        <v-container
          class="d-flex justify-center"
        >
          <v-breadcrumbs
            v-if="step<3"
            large
            :items="items"
          >
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :class="step === item.disabled ? '' : 'pointer'"
                :disabled="step === item.disabled ? true : false"
                @click="handle_function_call(item.click)"
              >
                {{ item.text.toUpperCase() }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-container>
      </v-col>
      <v-col
        v-if="this.$route.params.id != null"
      >
        <v-container
          class="d-flex justify-center"
        >
          <p
            style="text-decoration: underline"
          >
            Die letzten Schritte
          </p>
        </v-container>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
  import { sync } from 'vuex-pathify'

  export default {
    name: 'HeaderBar',

    data: () => ({
      items: [
        {
          text: 'Login',
          disabled: 1,
          click: 'plus',
        },
        {
          text: 'Registrieren',
          disabled: 2,
          click: 'minus',
        },
      ],
    }),

    computed: {
      ...sync('start', [
        'step',
      ]),
    },

    methods: {
      change () {
        this.$router.replace({ path: this.$route.path, query: { state: '1' } })
      },
      handle_function_call (FunctionName) {
        this[FunctionName]()
      },
      plus () {
        this.step = 1
      },
      minus () {
        this.step = 2
      },
    },
  }
</script>

<style lang="sass">
  .pointer
    cursor: pointer
</style>
