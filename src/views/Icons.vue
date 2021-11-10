<template>
  <v-container
    id="alerts"
    fluid
    tag="section"
  >
    <view-intro
      heading="Upcoming"
      link="components/alerts"
      style="height: 200px"
    />
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          class="text-center"
          align-self="center"
          cols="12"
          md="8"
        >
          <v-card
            :loading="loading"
          >
            <v-card-title
              class="text-center text-h3 font-weight-black"
            >
              Upcoming
            </v-card-title>
            <v-card-subtitle
              class="pb-0"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <span
                    class="text-h4"
                  >
                    Datum
                  </span>
                </v-col>
                <v-col>
                  <span
                    class="text-h4"
                  >
                    Event
                  </span>
                </v-col>
              </v-row>
              <v-divider />
            </v-card-subtitle>
            <v-card-text
              class="pa-0"
            >
              <v-card
                class="overflow-y-auto pa-0"
                color="transparent"
                max-height="900px"
              >
                <v-timeline
                  :key="keyloader"
                  class="mx-3"
                  dense
                  align-top
                >
                  <div
                    v-for="(year, y) in eventsOrderd"
                    :key="y"
                  >
                    <p class="mb-n1 font-weight-black text-h3">
                      {{ y }}
                    </p>
                    <div
                      v-for="(month, m) in year"
                      :key="m"
                      class="py-2"
                    >
                      <p class="mb-0 font-weight-medium text-h4">
                        {{ monthNames[m] }}
                      </p>
                      <v-divider
                        class="mb-6"
                      />
                      <v-timeline-item
                        v-for="(day, d) in month"
                        :key="d"
                        right
                        color="#334460"
                      >
                        <span
                          slot="opposite"
                          class="mr-n12"
                        >
                          <object
                            :id="`${day[0].tag}`"
                            type="image/svg+xml"
                            :data="require('@/assets/date.svg')"
                            class="mt-n3"
                          />
                        </span>
                        <v-card
                          class="mt-3"
                          color="#334460"
                        >
                          <v-row>
                            <v-col
                              v-for="(event, index) in day"
                              :key="index"
                              cols="12"
                            >
                              <v-card
                                class="elevation-8 mx-4"
                                color="#334563"
                                @click="openeventdialog(event)"
                              >
                                <v-card-title
                                  class="text-h4  white--text"
                                >
                                  {{ event.title }}
                                  <v-spacer />
                                  <span
                                    class="font-weight-thin text-subtitle-2 grey--text text--secondary"
                                  >
                                    <v-icon
                                      v-if="event.foryou"
                                      color="green"
                                    >
                                      mdi-check-circle
                                    </v-icon>
                                    {{ event.cat }}
                                  </span>
                                </v-card-title>
                                <v-card-text
                                  class="text-left"
                                >
                                  <span
                                    class="text-body-1"
                                  >
                                    {{ event.description }}
                                  </span>
                                  <br>
                                  <br>
                                  <span
                                    class="text-caption"
                                  >
                                    {{ event.caption }}
                                  </span>
                                  <br>
                                  <span
                                    class="font-weight-thin"
                                  >
                                    {{ event.datumvoll }}
                                  </span>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-timeline-item>
                    </div>
                  </div>
                </v-timeline>
                <div
                  v-if="events1.length == 0"
                  class="blck--text text-center font-weight-black text-h4"
                >
                  Keine
                  Events
                </div>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          class="d-flex justify-center"
        >
          <v-card
            min-width="350px"
            max-width="400px"
            max-height="611px"
          >
            <v-card-title
              class="text-center text-h3 font-weight-black"
            >
              Filter
            </v-card-title>
            <v-card-subtitle
              class="pb-0"
            >
              <v-divider />
              <v-row
                class="py-2"
              >
                <v-col
                  class="text-center"
                  align-self="center"
                >
                  <v-btn
                    class="rounded-l rounded-r-0 elevation-3"
                    :disabled="!my"
                    @click="my = !my, FilterIt()"
                  >
                    Alle
                    Events
                  </v-btn>
                  <v-btn
                    class="rounded-r rounded-l-0 elevation-3"
                    :disabled="my"
                    @click="my = !my, FilterIt()"
                  >
                    Meine
                    Events
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider />
            </v-card-subtitle>
            <v-card-text
              class="pa-0"
            >
              <v-card
                class="overflow-y-auto pa-0 elevation-0"
                color="transparent"
                max-height="500px"
              >
                <default-turnier-info
                  :event="SelectedEvent"
                  :dialog.sync="dialog"
                />
                <v-subheader
                  :inset="inset"
                >
                  Datum
                </v-subheader>
                <v-container>
                  <v-row
                    justify="center"
                    no-gutters
                  >
                    <v-col
                      class="text-center pa-0 pl-2"
                      md="5"
                    >
                      <v-dialog
                        ref="menu1"
                        v-model="daterange.menu1"
                        :return-value.sync="daterange.start"
                        persistent
                        width="290px"
                      >
                        <template
                          v-slot:activator="{ on, attrs }"
                        >
                          <v-text-field
                            v-model="daterange.start"
                            label="von"
                            append-icon="mdi-calendar"
                            color="blue"
                            hide-details
                            outlined
                            clearable
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="FilterIt()"
                          />
                        </template>
                        <v-date-picker
                          v-model="daterange.start"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="daterange.menu1 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu1.save(daterange.start), FilterIt()"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col
                      class="text-center pa-0"
                      align-self="center"
                    >
                      <span
                        class="black--text font-weight-black"
                      >
                        &mdash;
                      </span>
                    </v-col>
                    <v-col
                      class="text-center pa-0 pr-2"
                      md="5"
                    >
                      <v-dialog
                        ref="menu"
                        v-model="daterange.menu"
                        :return-value.sync="daterange.end"
                        persistent
                        width="290px"
                      >
                        <template
                          v-slot:activator="{ on, attrs }"
                        >
                          <v-text-field
                            v-model="daterange.end"
                            label="bis"
                            append-icon="mdi-calendar"
                            color="blue"
                            hide-details
                            outlined
                            clearable
                            dense
                            readonly
                            v-bind="attrs"
                            @click:clear="FilterIt()"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="daterange.end"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="daterange.menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(daterange.end), FilterIt()"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-for="(filter, index) in filters"
                  :key="index"
                  class="py-0"
                  fluid
                >
                  <v-subheader
                    :inset="inset"
                  >
                    {{ filter.title }}
                  </v-subheader>

                  <v-list>
                    <v-list-item-group
                      v-model="model[filter.type]"
                      multiple
                    >
                      <template
                        v-for="item in filter.filteritems"
                      >
                        <v-tooltip
                          v-if="item.tooltip"
                          :key="item.tag"
                          top
                        >
                          <template
                            v-slot:activator="{ on, attrs }"
                          >
                            <v-list-item
                              :key="item.tag"
                              :value="item.tag"
                              class="mt-n5"
                              active-class="no-active"
                              v-bind="attrs"
                              v-on="on"
                              @click="FilterIt()"
                            >
                              <v-list-item-action>
                                <v-checkbox
                                  :input-value="model[filter.type].includes(item.tag)"
                                />
                              </v-list-item-action>

                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.name }}
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                          <span>
                            {{ item.tooltip }}
                          </span>
                        </v-tooltip>
                        <v-list-item
                          v-else
                          :key="item.tag"
                          :value="item.tag"
                          class="mt-n5"
                          active-class="no-active"
                          @click="FilterIt()"
                        >
                          <v-list-item-action>
                            <v-checkbox
                              :input-value="model[filter.type].includes(item.tag)"
                            />
                          </v-list-item-action>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-container>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import firebase from 'firebase/app'
  export default {
    name: 'NotificationsView',

    components: {
      DefaultTurnierInfo: () => import(
        /* webpackChunkName: "default-account" */
        '../layouts/default/widgets/TurnierDialog.vue'
      ),
    },

    data: () => ({
      dialog: false,
      SelectedEvent: {},
      loading: false,
      model: {
        cat: [],
        event: [],
        region: [],
        relevanz: [],
        nationalität: [],
      },
      keyloader: 0,
      inset: true,
      daterange: {
        menu1: false,
        menu: false,
        start: '',
        end: '',
      },
      my: false,
      eventsOrderd: {},
      events1: [],
      events2: [],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      weekDayNames: [
        'SON',
        'MON',
        'DIE',
        'MIT',
        'DON',
        'FRE',
        'SAM',
      ],
      filters: [
        {
          type: 'cat',
          title: 'Kategorien',
          filteritems: [
            { name: 'Poussins / U8', tag: 'u8', tooltip: '2013 und jünger)' },
            { name: 'Pupilles / U10', tag: 'u10', tooltip: '2011/12' },
            { name: 'Benjamins / U12', tag: 'u12', tooltip: '2009/10' },
            { name: 'Minims / U14', tag: 'u14', tooltip: '2007/08' },
            { name: 'Cadets / U17', tag: 'u17', tooltip: '2004/05/06' },
            { name: 'Junioren / U20', tag: 'u20', tooltip: '2001/02/03' },
            { name: 'Senioren / U23', tag: 'u23', tooltip: '2000 - 1997' },
            { name: 'Senioren / Ü23', tag: 'ü23', tooltip: '1996 - 1977' },
            { name: 'Veteranen / Ü45', tag: 'ü45', tooltip: '1976 und älter' },
          ],
        },
        {
          type: 'event',
          title: 'Event Type',
          filteritems: [
            { name: 'Turnier', tag: 'turnier' },
            { name: 'Lager', tag: 'lager' },
            { name: 'Leistungs Test', tag: 'test' },
            { name: 'Brassard', tag: 'brassard' },
            { name: 'Anlass', tag: 'anlass' },
            { name: 'Ferien', tag: 'ferien' },
            { name: 'Anderes', tag: 'anderes' },
          ],
        },
        {
          type: 'region',
          title: 'Region',
          filteritems: [
            { name: 'Lokal', tag: 'loc' },
            { name: 'Regional', tag: 'reg' },
            { name: 'National', tag: 'nat' },
            { name: 'Kontinental', tag: 'kon', tooltip: 'Europa' },
            { name: 'Global', tag: 'glo' },
          ],
        },
        {
          type: 'relevanz',
          title: 'Ranglisten Relevanz',
          filteritems: [
            { name: 'keine', tag: 'keinrang' },
            { name: 'Selektions Rangliste', tag: 'selrang' },
            { name: 'Nationale Rangliste', tag: 'natrang' },
            { name: 'Europaweite Rangliste', tag: 'eurorang' },
            { name: 'Globale Rangliste', tag: 'globrang' },
          ],
        },
        {
          type: 'nationalität',
          title: 'vorgegebene Nationalität',
          filteritems: [
            { name: 'Man muss Schweizer sein', tag: 'swiss' },
            { name: 'keine spezifische Nationalität erforderlich', tag: 'nonswiss' },
          ],
        },
      ],
      Arranged: {},
      matches: '',
    }),

    computed: {
      ...get('userfirebase', [
        'events',
        'infos',
      ]),
    },

    mounted () {
      this.events2 = this.events
      this.events2.sort(this.compare)
      if (this.events.length !== 0) {
        this.SelectedEvent = this.events[0]
      }
      this.storeEvents()
      this.$nextTick(function () {
        setTimeout(() => {
          this.forceupdate++
          this.changeText()
        }, 1000)
      })
    },

    methods: {
      storeEvents () {
        this.events1 = []
        for (let i = 0; i < this.events2.length; i++) {
          const element = this.events2[i]
          var cat = ''

          element.filter.cat.forEach(element2 => {
            cat += element2 + ' / '
          })

          var datumvoll = ''

          if (element.Datum[0].seconds === element.Datum[1].seconds) {
            datumvoll = this.convertDate(element.Datum[0])
          } else {
            datumvoll = this.convertDate(element.Datum[0]) + ' - ' + this.convertDate(element.Datum[1])
          }

          var foryou = element.filter.cat.find(ca => {
            var bool = true
            if (!(ca === this.categorie(this.infos.privat.geburtsdatum))) { bool = false }
            if (!(element.filter.event === 'anlass' | element.filter.event === 'ferien' | element.filter.event === 'anderes') && !(this.infos.privat.fechten)) { bool = false }
            return bool
          })

          if (!this.my) {
            this.events1[i] = {
              ID: element.ID,
              type: element.filter.event,
              title: element.Title,
              cat: cat,
              foryou: foryou,
              caption: 'in ' + element.ort,
              description: element.beschreibung,
              to: '/',
              datumvoll: datumvoll,
              date: element.Datum[0].toDate().getDate() + '',
              day: this.weekDayNames[element.Datum[0].toDate().getDay()],
              datum: element.Datum[0].toDate(),
              tag: `_date-${element.Datum[0].toDate().getDate()}-${element.Datum[0].toDate().getMonth()}-${element.Datum[0].toDate().getFullYear()}`,
            }
          } else if (foryou) {
            this.events1[this.events1.length] = {
              ID: element.ID,
              type: element.filter.event,
              title: element.Title,
              cat: cat,
              foryou: foryou,
              caption: 'in ' + element.ort,
              description: element.beschreibung,
              to: '/',
              date: element.Datum[0].toDate().getDate() + '',
              day: this.weekDayNames[element.Datum[0].toDate().getDay()],
              datum: element.Datum[0].toDate(),
              tag: `_date-${element.Datum[0].toDate().getDate()}-${element.Datum[0].toDate().getMonth()}-${element.Datum[0].toDate().getFullYear()}`,
            }
          }
        }
        this.eventsOrderd = this.rightOrder()
        console.log('this is the order: ', this.rightOrder())
        this.forcereload()
      },
      rightOrder () {
        var item
        var i = 0
        var groups = {}
        var year = ''
        var month = ''
        var day = ''
        console.log('Array: ', this.events1)
        while (this.events1[i]) {
          item = this.events1[i]
          item = item.datum
          console.log('Item: ', item)
          year = item.getFullYear()
          month = item.getMonth()
          day = item.getDate()
          groups[year] || (groups[year] = {}) // exists OR create {}
          groups[year][month] || (groups[year][month] = {}) // exists OR create {}
          groups[year][month][day] || (groups[year][month][day] = []) // exists OR create []
          groups[year][month][day].push(this.events1[i])
          i++
        }
        return groups
      },
      compare (a, b) {
        // Use toUpperCase() to ignore character casing
        const datumA = a.Datum[0].toDate()
        const datumB = b.Datum[0].toDate()

        let comparison = 0
        if (datumA > datumB) {
          comparison = 1
        } else if (datumA < datumB) {
          comparison = -1
        }
        return comparison
      },
      FilterIt () {
        this.loading = true
        const filters = {
          filter: filter => {
            var cat = filter.cat
            var event = filter.event
            var region = filter.region
            var relevanz = filter.relevanz
            var nationalität = filter.nationalität
            var catvar = true
            var eventvar = true
            var regionvar = true
            var relevanzvar = true
            var nationalitätvar = true

            if (this.model.cat.length !== 0) {
              catvar = cat.find(x => this.model.cat.includes(x))
            }
            if (this.model.event.length !== 0) {
              eventvar = this.model.event.includes(event)
            }
            if (this.model.region.length !== 0) {
              regionvar = this.model.region.includes(region)
            }
            if (this.model.relevanz.length !== 0) {
              relevanzvar = relevanz.find(x => this.model.relevanz.includes(x))
            }
            if (this.model.nationalität.length !== 0) {
              nationalitätvar = nationalität.find(x => this.model.nationalität.includes(x))
            }
            return catvar && eventvar && regionvar && relevanzvar && nationalitätvar
          },
          Datum: Datum => {
            var datum = true
            var test1 = firebase.firestore.Timestamp.fromDate(new Date(this.daterange.start))
            var test2 = firebase.firestore.Timestamp.fromDate(new Date(this.daterange.end))
            if ((this.daterange.start === '' | this.daterange.start === null) && (this.daterange.end === '' | this.daterange.end === null)) {
              return datum
            } else if (this.daterange.start === '' | this.daterange.start === null) {
              datum = Datum[0].toDate() <= test2.toDate()
            } else if (this.daterange.end === '' | this.daterange.end === null) {
              datum = Datum[0].toDate() >= test1.toDate()
            } else {
              datum = Datum[0].toDate() >= test1.toDate() && Datum[0].toDate() <= test2.toDate()
            }
            return datum
          },
        }
        setTimeout(() => {
          this.events2 = this.events
          this.events2 = this.filterArray(this.events2, filters)
          console.log(this.events2.sort(this.compare))
          this.storeEvents()
          this.loading = false
          this.$nextTick(function () {
            setTimeout(() => {
              this.changeText()
            }, 500)
          })
        }, 1000)
      },
      update () {
        this.loading = true
        this.$store.commit({ type: 'userfirebase/updateEvents' })
        setTimeout(() => {
          this.loading = false
          this.forceupdate++
        }, 2000)
      },
      convertDate (date) {
        const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
        return date.toDate().toLocaleDateString('de-DE', options)
      },
      filterArray (array, filters) {
        const filterKeys = Object.keys(filters)
        return array.filter(item => {
          // validates all filter criteria
          return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true
            return filters[key](item[key])
          })
        })
      },
      categorie (geburtstag) {
        var year = geburtstag.toDate().getFullYear()
        var thisyear = new Date().getFullYear()
        var date1 = new Date('June 30, ' + thisyear)
        if (!(new Date() > date1)) thisyear--
        if (year > thisyear - 8) {
          return 'u8'
        } else if (year > thisyear - 10) {
          return 'u10'
        } else if (year > thisyear - 12) {
          return 'u12'
        } else if (year > thisyear - 14) {
          return 'u14'
        } else if (year > thisyear - 17) {
          return 'u17'
        } else if (year > thisyear - 20) {
          return 'u20'
        } else if (year > thisyear - 45) {
          if (year >= thisyear - 23) {
            return 'u23)'
          } else {
            return 'ü23'
          }
        } else {
          return 'ü45'
        }
      },
      to (to) {
        this.$router.push(to)
      },
      forcereload () {
        this.keyloader++
      },
      changeText () {
        for (var i = 0; i < this.events1.length; i++) {
          var svgObject = document.getElementById(`${this.events1[i].tag}`).contentDocument
          var date = svgObject.getElementById('date')
          var day = svgObject.getElementById('day')
          date.textContent = this.events1[i].date
          day.textContent = this.events1[i].day
        }
      },
      openeventdialog (event) {
        this.dialog = false
        this.SelectedEvent = this.events.find((x) => {
          return x.ID === event.ID
        })
        this.dialog = true
      },
    },
  }
</script>

<style
  lang="sass"
>

  .pointer
    cursor: pointer

  :root
    --timeline-opposite-item-width: 110px
    --timeline-line-width: 8px

  .v-timeline--dense .v-timeline-item__opposite
    display: inline-block

  .v-timeline-item__opposite
    align-self: inherit
    flex: none
    min-width: var(--timeline-opposite-item-width)

  /* line: divider in the middle is 96px wide by default */
  .v-application--is-ltr .v-timeline--dense:not(.v-timeline--reverse):before
    left: calc( var(--timeline-opposite-item-width) + (96px - var(--timeline-line-width)) / 2 )
    width: var(--timeline-line-width)

  .no-active::before
    background-color: transparent !important

</style>
