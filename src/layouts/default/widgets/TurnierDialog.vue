<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
  >
    <v-card
      class="overflow-y-auto"
      color="#313260"
      max-height="100vh"
    >
      <v-card-text
        class="mt-15"
      >
        <v-row>
          <v-col
            offset-md="3"
            md="6"
            cols="12"
          >
            <v-card
              :loading="loading"
            >
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
                        class="pa-0 ma-0 pt-2 pb-1"
                      >
                        <v-col
                          class="pa-0 ma-0"
                        >
                          <v-container
                            class="d-flex justify-center pa-0 ma-0"
                          >
                            <span class="text-h5 font-weight-medium text-decoration-underline text-uppercase">{{ event.Title }}</span>
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
                            <span class="text-subtitle-2">{{ makedatetitle(event.Datum) }}</span>
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
                  <v-row
                    v-if="!AnmeldungsPanel"
                  >
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
                            v-if="userVerküpfteKonnten.length !== 0"
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
                                  <div
                                    v-if="userVerküpfteKonnten.length === 0"
                                    class="font-weight-black text-center"
                                  >
                                    Keine Konten Verknüpft
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card-text>
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
                                      gender
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
                                    <td>{{ item.gen }}</td>
                                    <td>{{ claculateScratchTime(item.time) }}</td>
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
                  <v-row
                    v-else
                  >
                    <v-expansion-panels focusable>
                      <v-expansion-panel
                        :disabled="loading"
                      >
                        <v-expansion-panel-header
                          class="py-0"
                        >
                          <v-list-item
                            :key="1"
                          >
                            <v-list-item-avatar>
                              <v-img
                                :alt="`${infos.login.avatar} avatar`"
                                :src="infos.login.avatar"
                              />
                            </v-list-item-avatar>
                            <v-list-item-avatar>
                              <v-icon
                                :color="angemeldet ? 'green' : 'red'"
                              >
                                {{angemeldet ? 'mdi-check-bold' : 'mdi-close-thick'}}
                              </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content
                              class="text-left"
                            >
                              <v-list-item-title
                                v-text="infos.privat.firstName + ' ' + infos.privat.nachName"
                              />
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-list-item-action-text
                                v-if="infos.privat.fechten"
                                class="text-right"
                                :key="1"
                              >
                                {{ getcategorieandsize(infos) }}
                              </v-list-item-action-text>
                            </v-list-item-action>
                          </v-list-item>
                          <template v-slot:actions>
                            <v-icon color="primary">
                              $expand
                            </v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <default-anmelde-infos
                            :geb='infos.privat.geburtsdatum'
                            :available="testTurnierforYou(infos.privat.geburtsdatum)"
                            :needsmaterial="GetBool[event.filter.event].material && infos.privat.fechten"
                            :selected1.sync="selected"
                            :angemeldet1.sync="angemeldet"
                            :reparaturen1.sync="reparaturen"
                          />
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                      <v-expansion-panel
                        v-for="(item, i) in userVerküpfteKonnten"
                        :key="i"
                        :disabled="loading"
                      >
                        <v-expansion-panel-header
                          class="py-0"
                        >
                          <v-list-item
                            :key="i"
                          >
                            <v-list-item-avatar>
                              <v-img
                                :alt="`${item.login.avatar} avatar`"
                                :src="item.login.avatar"
                              />
                            </v-list-item-avatar>
                            <v-list-item-avatar
                              :key="updaterID"
                            >
                              <v-icon
                                :color="(item.angemeldet) ? 'green' : 'red'"
                              >
                                {{(item.angemeldet) ? 'mdi-check-bold' : 'mdi-close-thick'}}
                              </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content
                              class="text-left"
                            >
                              <v-list-item-title
                                v-text="item.privat.firstName + ' ' + item.privat.nachName"
                              />
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-list-item-action-text
                                v-if="testTurnierforYou(item.privat.geburtsdatum)"
                                class="text-right"
                                :key="i"
                              >
                                {{ getcategorieandsize(item) }}
                              </v-list-item-action-text>
                            </v-list-item-action>
                          </v-list-item>
                          <template v-slot:actions>
                            <v-icon color="primary">
                              $expand
                            </v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <default-anmelde-infos
                            :geb='item.privat.geburtsdatum'
                            :available="testTurnierforYou(item.privat.geburtsdatum)"
                            :needsmaterial="GetBool[event.filter.event].material"
                            :selected1.sync="item.selected"
                            :angemeldet1.sync="item.angemeldet"
                            :reparaturen1.sync="item.reparaturen"
                          />
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
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
              v-if="GetBool[event.filter.event].anmelden && foryou"
              :disabled="loading"
              outlined
              color="primary"
              dark
              @click="submitAnmeldung"
            >
              {{AnmeldungsPanel ? 'Bestätigen' : 'Anmelden'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="AnmeldungsPanel"
          :disabled="loading"
          color="blue darken-1"
          text
          @click="AnmeldungsPanel = false"
        >
          back
        </v-btn>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          :disabled="loading"
          text
          @click.native="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { sync } from 'vuex-pathify'
  import { useUsers, useEvent, authService } from '../../../Firebase/init'
  import { categorie, weaponsize, convertDate } from '../../../util/helpers'
  const { checkifAngemeldet, anmelden, abmelden, getAllAnmeldungen, getAnmeldung } = useEvent()
  const { getInfUser } = useUsers()

  export default {
    name: 'TurnierDialog',

    props: {
      event: Object,
      dialog: Boolean,
      foryou: Boolean,
    },

    components: {
      DefaultEventDialog: () => import(
        /* webpackChunkName: "default-account" */
        './EventDialog.vue'
      ),
      DefaultAnmeldeInfos: () => import(
        /* webpackChunkName: "default-account" */
        './AnmeldeInfos.vue'
      ),
    },

    data () {
      return {
        loading: false,
        angemeldet: false,
        selected: [],
        reparaturen: '',
        dialog2: false,
        userVerküpfteKonnten: [],
        updaterID: 0,
        AnmeldungsPanel: false,
        GetBool: {
          turnier: { driving: true, anmelden: true, material: true },
          lager: { driving: false, anmelden: true, material: true },
          test: { driving: true, anmelden: true, material: false },
          brassard: { driving: false, anmelden: false, material: false },
          anlass: { driving: false, anmelden: true, material: false },
          ferien: { driving: false, anmelden: false, material: false },
          anderes: { driving: true, anmelden: true, material: false },
        },
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
      async submitAnmeldung () {
        if (this.AnmeldungsPanel) {
          this.loading = true
          console.log(this.selected)
          for (let i = 0; i < this.userVerküpfteKonnten.length; i++) {
            if (this.testTurnierforYou(this.userVerküpfteKonnten[i].privat.geburtsdatum)) {
              this.userVerküpfteKonnten[i].angemeldet ? await anmelden(this.userVerküpfteKonnten[i].uid, this.event.uid, categorie(this.userVerküpfteKonnten[i].privat.geburtsdatum, 'tag'), { mat: this.userVerküpfteKonnten[i].selected, rep: this.userVerküpfteKonnten[i].reparaturen }) : await abmelden(this.userVerküpfteKonnten[i].uid, this.event.uid)
            }
          }
          if (this.testTurnierforYou(this.infos.privat.geburtsdatum)) {
            this.angemeldet ? await anmelden(authService.user.uid, this.event.uid, categorie(this.infos.privat.geburtsdatum, 'tag'), { mat: this.selected, rep: this.reparaturen }) : abmelden(authService.user.uid, this.event.uid)
          }
          setTimeout(() => {
            this.loading = false
            this.AnmeldungsPanel = !this.AnmeldungsPanel
          }, 2000)
        } else {
          this.AnmeldungsPanel = !this.AnmeldungsPanel
        }
      },
      claculateScratchTime (time) {
        var ArrayParts = time.split(':')
        var hours = parseInt(ArrayParts[0])
        var minutes = parseInt(ArrayParts[1])
        minutes += 30
        if (minutes >= 60) {
          minutes -= 60
          return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
        }
        hours -= 1
        return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes)
      },
      changeAnmeldeState (item) {
        item.angemeldet = !item.angemeldet
        this.$nextTick(() => {
          this.updaterID++
        })
      },
      async storeKonten () {
        this.userVerküpfteKonnten = []
        for (let i = 0; i < this.infos.kinder.length; i++) {
          this.userVerküpfteKonnten[i] = await getInfUser(this.infos.kinder[i])
          this.userVerküpfteKonnten[i].uid = this.infos.kinder[i]
          await getAnmeldung(this.infos.kinder[i], this.event.uid).then(result => {
            this.userVerküpfteKonnten[i].selected = result.material.mat
            if (result.material.rep !== '') { this.userVerküpfteKonnten[i].selected.push('Reparatur') }
            this.userVerküpfteKonnten[i].reparaturen = result.material.rep
          })
          this.userVerküpfteKonnten[i].angemeldet = (await checkifAngemeldet(this.infos.kinder[i], this.event.uid) && this.testTurnierforYou(this.userVerküpfteKonnten[i].privat.geburtsdatum))
        }
        await getAnmeldung(authService.user.uid, this.event.uid).then(result => {
          this.selected = result.material.mat
          if (result.material.rep !== '') { this.selected.push('Reparatur') }
          this.reparaturen = result.material.rep
        })
        this.angemeldet = (await checkifAngemeldet(authService.user.uid, this.event.uid) && this.testTurnierforYou(this.infos.privat.geburtsdatum))
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

      testTurnierforYou (geburtsdatum) {
        var tag = categorie(geburtsdatum, 'tag')

        var valid = true
        var cat = this.event.filter.cat.find(x => x === tag)
        if (cat === undefined) valid = false
        return valid
      },

      close () {
        this.AnmeldungsPanel = false
        this.$emit('update:dialog', false)
      },
    },
  }
</script>

<style>

</style>
