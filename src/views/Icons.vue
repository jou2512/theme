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
          <v-card>
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
                  class="mx-3"
                  dense
                  align-top
                >
                  <v-timeline-item
                    v-for="(event, n) in events"
                    :key="n"
                    right
                    color="#334460"
                  >
                    <span
                      slot="opposite"
                      class="mr-n12"
                    >
                      <object
                        :id="`_date-${n}`"
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
                          cols="12"
                        >
                          <v-card
                            class="elevation-8 mx-4"
                            color="#334563"
                            @click="changeText"
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
                              <span
                                class="text-caption"
                              >
                                {{ event.caption }}
                              </span>
                            </v-card-text>
                          </v-card>
                        </v-col>
                        <v-col
                          v-if="n == 1"
                          cols="12"
                          class="mt-n4"
                        >
                          <v-card
                            class="elevation-8 mx-4"
                            color="#334563"
                          >
                            <v-card-title
                              class="text-h5  white--text"
                            >
                              Test
                              Pist
                            </v-card-title>
                            <v-card-text
                              class="text-left"
                            >
                              U14
                              /
                              U17
                              /
                              U20
                              in
                              Biel
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
                <div
                  v-if="events.length == 0"
                  class="blck--text text-center font-weight-black text-h4"
                >
                  Keine
                  Neugigkeiten
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
                    @click="my = !my"
                  >
                    Alle
                    Events
                  </v-btn>
                  <v-btn
                    class="rounded-r rounded-l-0 elevation-3"
                    :disabled="my"
                    @click="my = !my"
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
                            @click="$refs.menu1.save(daterange.start)"
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
                            @click="$refs.menu.save(daterange.end)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container
                  v-for="filter in filters"
                  :key="filter"
                  class="py-0"
                  fluid
                >
                  <v-subheader
                    :inset="inset"
                  >
                    {{ filter.title }}
                  </v-subheader>

                  <v-list>
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
                            class="mt-n5"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-list-item-action>
                              <v-checkbox />
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
                        class="mt-n5"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-list-item-action>
                          <v-checkbox />
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.name }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
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
  export default {
    name: 'NotificationsView',

    data: () => ({
      daterange: {
        menu1: false,
        menu: false,
        start: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        end: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      my: true,
      events: [
        { type: 'test', title: 'Test Pist', cat: 'H&D U14 / U17 / U20', foryou: false, caption: 'in Biel', description: 'Nationaler Test für die Olympic talent card', to: '/', date: '03', day: 'TUE' },
        { type: 'turnier', title: 'Schweizermeisterschaften', cat: 'D U14 und jünger', foryou: false, caption: 'in Morges', description: 'Einzel und Mannschafts Turnier', to: '/', date: '14', day: 'MON' },
        { type: 'turnier', title: 'Basler Meisterschaften', cat: 'H&D U14 / U17 / U20', foryou: true, caption: 'Im Basler Fechtsaal', description: 'Bitte alle die 20.- mitbringen und sich unbedingt im Vorraus anmelden', to: '/', date: '25', day: 'FRI' },
        { type: 'turnier', title: 'Zürich Turnier', cat: 'H&D U17', foryou: false, caption: 'in Zürich', description: '1 Selektions Turnier der Saison', to: '/', date: '15', day: 'SAT' },
        { type: 'turnier', title: 'Budapest Turnier', cat: 'H&D U17 / U20', foryou: true, caption: 'in Budapest', description: '2 unserer Fechter sind in Budapest', to: '/', date: '26', day: 'SUN' },
        { type: 'lager', title: 'Fechtlager Waldkirch', cat: 'alle', foryou: true, caption: 'in Waldkirch', description: 'Es ist wieder so weit! Waldkirch findet zum 15. mal statt. Wir freuen uns über jeden der kommt', to: '/', date: '06', day: 'MON' },
        { type: 'event', title: 'Weisswurst Abend', cat: 'alle', foryou: true, caption: 'am Rhein', description: 'Es ist wieder so weit', to: '/', date: '17', day: 'SAT' },
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
            { name: 'Senioren / Ü20', tag: 'ü20', tooltip: '2000 - 1982' },
            { name: 'Veteranen / Ü40', tag: 'ü40', tooltip: '1991 und älter' },
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
    }),

    mounted () {
      this.$nextTick(function () {
        setTimeout(() => {
          this.changeText()
        }, 1000)
      })
    },

    methods: {
      deletNews (newsIndex) {
        this.news.splice(newsIndex, 1)
        console.log(this.news)
      },
      to (to) {
        this.$router.push(to)
      },
      changeText () {
        for (var i = 1; i < this.events.length; i++) {
          console.log('good')
          var svgObject = document.getElementById(`_date-${i}`).contentDocument
          var date = svgObject.getElementById('date')
          var day = svgObject.getElementById('day')
          console.log(date)
          console.log(day)
          date.textContent = this.events[i].date
          day.textContent = this.events[i].day
        }
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
</style>
