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

            <v-card-subtitle
              class="mt-1"
            >
              <v-divider />
            </v-card-subtitle>

            <v-card-text>
              <v-list>
                <v-card
                  v-for="(item, i) in news"
                  :key="i"
                  color="#334563"
                  class="mt-4"
                >
                  <v-card-text
                    class="pa-0"
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon
                          large
                          color="white"
                        >
                          {{ icons[item.type] }}
                        </v-icon>
                      </v-list-item-icon>
                      <v-list-item-title
                        class="white--text text-left font-weight-black text-h4 pointer"
                        @click="to(item.to)"
                      >
                        {{ item.message }}
                      </v-list-item-title>
                      <v-list-item-action>
                        <v-btn
                          icon
                          @click="deletNews(i)"
                        >
                          <v-icon
                            color="grey"
                          >
                            mdi-close
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-card-text>
                </v-card>
              </v-list>
              <div
                v-if="news.length == 0"
                class="blck--text text-center font-weight-black text-h4"
              >
                Keine Neugigkeiten
              </div>
            </v-card-text>
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
      news: [
        { type: 'message', message: 'Andrina hat dir geschrieben', to: '/' },
        { type: 'important', message: 'Neues Ranglisten System wird eingeführt', to: '/' },
        { type: 'message', message: 'Alexa hat dir geschrieben', to: '/' },
        { type: 'info', message: 'Die Brassards finden wieder statt', to: '/' },
        { type: 'important', message: 'Covid-19 Imfung wird ab jetzt vorausgesetzt', to: '/' },
        { type: 'events', message: 'weisswurst essen am 30.6.21', to: '/' },
      ],
      icons: {
        message: 'mdi-message-outline',
        important: 'mdi-alert-decagram',
        info: 'mdi-alert-circle-outline',
        events: 'mdi-newspaper',
      },
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
    },

    methods: {
      deletNews (newsIndex) {
        this.news.splice(newsIndex, 1)
        console.log(this.news)
      },
      to (to) {
        this.$router.push(to)
      },
    },
  }
</script>

<style lang="sass">
  .pointer
    cursor: pointer
</style>
