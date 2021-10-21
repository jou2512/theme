<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
  >
    <template
      v-slot:activator="{ on, attrs }"
    >
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
      >
        Open
        Turnament
      </v-btn>
    </template>
    <v-card
      class="overflow-y-auto"
      color="#313260"
      max-height="100vh"
    >
      <v-card-title>
        <span class="text-h3 white--text">{{ event.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            offset-md="3"
            md="6"
            cols="12"
          >
            <v-card>
              <v-card-title
                class="pa-0"
              >
                <v-card
                  class="pa-0"
                  width="100%"
                  elevation="10"
                >
                  <v-list-item
                    class="px-15"
                  >
                    <v-list-item-icon>
                      <v-icon
                        color="blue"
                      >
                        mdi-information
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-row
                        class="pa-0 ma-0"
                      >
                        <v-col
                          class="pa-0 ma-0"
                        >
                          <v-container
                            class="d-flex justify-center pa-0"
                          >
                            <span class="text-h4 font-weight-bold">Informationen - {{ event.filter.event }} {{ event.ort }}</span>
                          </v-container>
                        </v-col>
                      </v-row>
                      <v-row
                        class="pa-0 ma-0"
                      >
                        <v-col
                          class="pa-0 ma-0"
                        >
                          <v-container
                            class="d-flex justify-center pa-0"
                          >
                            <span class="text-subtitle-1">{{ makedatetitle(event.Datum) }}</span>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon
                        color="blue"
                      >
                        mdi-information
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-card>
              </v-card-title>
              <v-card-text
                class="pt-10"
              >
                <v-container>
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col>
                          <v-subheader>Dokument</v-subheader>
                          <default-event-dialog
                            :dialog="dialog2"
                            :dokument="event.turnierausschreibung"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-subheader>Details</v-subheader>
                          <v-card
                            elevation="4"
                            class="pa-2"
                          >
                            {{ event.beschreibung }}
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-subheader>Karte</v-subheader>
                          <v-card
                            elevation="4"
                            class="pa-0"
                            width="400"
                            height="300"
                          >
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.746727715511!2d8.538133915875122!3d47.37786151174394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08cc0e6e41%3A0xf5c698b65f8c52a7!2sZ%C3%BCrich%20Hauptbahnhof!5e0!3m2!1sde!2sch!4v1631024969155!5m2!1sde!2sch"
                              width="400"
                              height="300"
                              style="border:0;"
                              allowfullscreen=""
                              loading="lazy"
                            >
                          </iframe>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row>
                        <v-col>
                          <v-card
                            elevation="4"
                            class="mt-4 text-center"
                            min-height="100px"
                          >
                            <v-card-text
                              class="py-0"
                            >
                              <v-row>
                                <v-col
                                  class="pa-0"
                                >
                                  <v-list
                                    class="pa-0"
                                  >
                                    <template v-for="(chat, index) in userVerküpfteKonnten">
                                      <v-list-item
                                        :key="index"
                                      >
                                        <v-list-item-avatar>
                                          <v-img
                                            :alt="`${chat.login.avatar} avatar`"
                                            :src="chat.login.avatar"
                                          />
                                        </v-list-item-avatar>

                                        <v-list-item-content
                                          class="text-left"
                                        >
                                          <v-list-item-title
                                            v-text="chat.privat.firstName + ' ' + chat.privat.nachName"
                                          />
                                        </v-list-item-content>

                                        <v-list-item-action>
                                          <v-list-item-action-text
                                            class="text-right"
                                            :key="index"
                                          >
                                            {{ getcategorieandsize(chat) }}
                                          </v-list-item-action-text>
                                        </v-list-item-action>
                                      </v-list-item>
                                      <v-divider
                                        :key="chat.privat.firstName"
                                        v-if="!(index+1 === userVerküpfteKonnten.length)"
                                      />
                                    </template>
                                  </v-list>
                                </v-col>
                              </v-row>
                            </v-card-text>
                            <div
                              v-if="userVerküpfteKonnten.length === 0"
                              class="font-weight-black"
                            >
                              Keine Konten Verknüpft
                            </div>
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <template
                            v-for="i in event.days.length"
                          >
                            <v-subheader
                              :key="event.days[i-1]"
                            >
                              {{ event.days[i-1] }}
                            </v-subheader>
                            <v-simple-table
                              :key="i"
                              dense
                            >
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Kategorie
                                    </th>
                                    <th class="text-left">
                                      Scratch
                                    </th>
                                    <th class="text-left">
                                      Start
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(item, index) in filterddays(i-1)"
                                    :key="index"
                                  >
                                    <td>{{ item.cat }}</td>
                                    <td>{{ item.time }}</td>
                                    <td>{{ item.time }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </template>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="d-flex justify-center"
          >
            <v-btn
              outline
              color="primary"
              dark
            >
              Anmelden
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { sync } from 'vuex-pathify'
  import { useUsers } from '../../../Firebase/init'
  import { categorie, weaponsize, convertDate } from '../../../util/helpers'
  const { getInfUser } = useUsers()

  export default {
    name: 'TurnierDialog',

    props: {
      event: Object,
    },

    components: {
      DefaultEventDialog: () => import(
        /* webpackChunkName: "default-account" */
        './EventDialog.vue'
      ),
    },

    data () {
      return {
        dialog: false,
        dialog2: false,
        userVerküpfteKonnten: [],
        updaterID: 0,
      }
    },

    computed: {
      ...sync('userfirebase', [
        'infos',
      ]),
    },

    mounted () {
      this.storeKonten()
    },

    methods: {
      async storeKonten () {
        this.userVerküpfteKonnten = []
        for (let i = 0; i < this.infos.kinder.length; i++) {
          this.userVerküpfteKonnten[i] = await getInfUser(this.infos.kinder[i])
        }
      },

      getcategorieandsize (kind) {
        return categorie(kind.privat.geburtsdatum) + ' || ' + weaponsize(kind.privat.geburtsdatum)
      },

      filterddays (day) {
        return this.event.startzeiten.filter(v => v.day === this.event.days[day])
      },

      makedatetitle (date) {
        return convertDate(date[0]) + ' - ' + convertDate(date[1])
      },
    },
  }
</script>

<style>

</style>
