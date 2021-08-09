<template>
  <v-container
    id="alerts"
    fluid
    tag="section"
  >
    <view-intro
      heading="Notifications"
      link="components/alerts"
      style="height: 200px"
    />
    <v-container>
      <v-row justify="center">
        <v-col
          class="text-center"
          align-self="center"
          cols="12"
          md="8"
        >
          <v-card
            id="card3"
            class="mt-4 text-center"
          >
            <v-card-title>
              <h1>Neugigkeiten</h1>
            </v-card-title>

            <v-card-subtitle>
              <v-divider />
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    name: 'NotificationsView',

    data: () => ({
      color: 'info',
      colors: [
        'info',
        'success',
        'warning',
        'error',
      ],
      dialog: false,
      dialog2: false,
      dialog3: false,
      direction: 'top center',
      directions: [
        'top left',
        'top center',
        'top right',
        'bottom left',
        'bottom center',
        'bottom right',
      ],
      snackbar: false,
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
    },

    methods: {
      randomColor () {
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
      },
    },
  }
</script>
