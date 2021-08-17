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
              <span class="grey--text text-h3"><span class="font-weight-black black--text">{{ notificationsLength }}</span> - Neugigkeiten</span>
            </v-card-title>

            <v-card-subtitle
              class="mt-1"
            >
              <v-divider />
            </v-card-subtitle>

            <v-card-text>
              <v-list>
                <v-card
                  v-for="(item, i) in notifications"
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
                          @click="delet(i)"
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
                v-if="notifications.length == 0"
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
  import { sync } from 'vuex-pathify'
  import { mapGetters } from 'vuex'

  export default {
    name: 'NotificationsView',

    data: () => ({
      //
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
      ...sync('notifications', [
        'notifications',
        'icons',
      ]),
      ...mapGetters('notifications', [
        'notificationsLength',
      ]),
    },

    methods: {
      to (to) {
        this.$router.push(to)
      },
      delet (index) {
        this.$store.commit({ type: 'notifications/deletNotification', notificationIndex: index })
      },
    },
  }
</script>

<style lang="sass">
  .pointer
    cursor: pointer
</style>
