<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Simple Tables"
      link="components/simple-tables"
      style="height: 200px"
    />
    <v-data-table
      :key="forceupdate"
      :headers="headers"
      :items="events"
      item-key="Title"
      :search="search"
      :loading="loading"
      :expanded="expanded"
      show-expand
      single-expand
      show-group-by
      class="elevation-1 rounded-lg"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          class="pa-0"
        >
          <v-container>
            <v-row>
              <v-col>
                <h3> Info about {{ item.Title }} </h3>
              </v-col>
            </v-row>
            <v-row
              justify="center"
            >
              <v-col
                cols="12"
                md="4"
              >
                <v-textarea
                  v-model="item.beschreibung"
                  color="blue"
                  outlined
                  readonly
                  label="Event Beschreibung"
                />
              </v-col>
              <v-col
                md="4"
              >
                <v-select
                  v-model="item.turnierausschreibung"
                  :items="turnierausschreibungen"
                  item-text="title"
                  item-value="link"
                  solo
                />
                <div class="text-center">
                  <default-event-dialog
                    :dialog="dialog3"
                    :dokument="item.turnierausschreibung"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                md="4"
              >
                <v-data-table
                  v-if="item.startzeiten[0].cat !== ''"
                  :headers="headersTime"
                  :items="item.startzeiten"
                />
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>
      <template v-slot:item.Datum="{ item }">
        {{ convertDate(item.Datum[0]) }}
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
          class="rounded-lg"
        >
          <v-toolbar-title>Events</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-btn
            icon
            small
          >
            <v-icon
              color="black"
              @click="update()"
            >
              mdi-refresh
            </v-icon>
          </v-btn>
          <v-spacer />
          <v-dialog
            v-model="dialog2"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                dark
                class="mb-2 mx-5"
                v-bind="attrs"
                v-on="on"
              >
                Menage Dokumente
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h4 pr-10">Menage Dokumente</span>
                <v-text-field
                  v-model="searchdokuments"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                />
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-data-table
                    :headers="headersdokuments"
                    :items="turnierausschreibungen"
                    :search="searchdokuments"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                        @click="deletFile(item.title)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-container>
              </v-card-text>
              <form
                ref="dokumentFrom"
                @submit.prevent="uploadFile()"
              >
                <v-card-actions
                  class="d-flex justify-center"
                >
                  <v-row
                    no-gutters
                  >
                    <v-col
                      cols="6"
                    >
                      <v-file-input
                        v-model="files"
                        dense
                        outlined
                        accept=".pdf"
                        label="File input"
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        color="blue"
                      />
                    </v-col>
                    <v-col
                      cols="3"
                      class="d-flex justify-end"
                    >
                      <v-btn
                        color="green darken-1"
                        type="submit"
                      >
                        Upload
                      </v-btn>
                    </v-col>
                    <v-col
                      cols="3"
                      class="d-flex justify-end"
                    >
                      <v-btn
                        color="red darken-1"
                        @click="dialog2 = false, files = []"
                      >
                        Close
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="reset"
              >
                New Event
              </v-btn>
            </template>
            <v-card
              class="overflow-y-auto"
              max-height="100vh"
            >
              <v-card-title>
                <span class="text-h3">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        v-model="newEvent.type"
                        :items="eventtype"
                        item-text="name"
                        item-value="tag"
                        label="Event Yype"
                        solo
                      />
                    </v-col>
                  </v-row>
                  <v-divider
                    class="mb-5"
                  />
                  <template>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="newEvent.title"
                          outlined
                          hide-details
                          label="Event Title"
                        />
                      </v-col>
                    </v-row>
                    <v-divider
                      class="my-5"
                    />
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
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
                                height="auto"
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
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-textarea
                          v-model="newEvent.beschreibung"
                          outlined
                          label="Event Beschreibung"
                        />
                      </v-col>
                      <v-col
                        v-if="GetBool[newEvent.type].dokument"
                        cols="12"
                        sm="2"
                        md="4"
                      >
                        <v-select
                          v-model="newEvent.dokument"
                          :items="turnierausschreibungen"
                          item-text="title"
                          item-value="link"
                          solo
                        />
                      </v-col>
                    </v-row>
                    <v-divider
                      class="my-5"
                    />
                    <v-row>
                      <v-col
                        v-if="GetBool[newEvent.type].categorie"
                        cols="12"
                        sm="2"
                        md="2"
                      >
                        <v-select
                          v-model="newEvent.selectedCategories"
                          :items="cat"
                          item-text="name"
                          item-value="tag"
                          label="Categorien"
                          multiple
                          chips
                          clearable
                          deletable-chips
                        >
                          <template v-slot:prepend-item>
                            <v-list-item
                              ripple
                              @click="toggle()"
                            >
                              <v-list-item-action>
                                <v-icon :color="newEvent.selectedCategories.length > 0 ? 'indigo darken-4' : ''">
                                  {{ icon }}
                                </v-icon>
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>
                                  Select All
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2" />
                          </template>
                        </v-select>
                      </v-col>
                      <v-col
                        v-if="GetBool[newEvent.type].region"
                        cols="12"
                        sm="2"
                        md="2"
                      >
                        <v-select
                          v-model="newEvent.region"
                          :items="region"
                          item-text="name"
                          item-value="tag"
                          label="Region"
                        />
                      </v-col>
                      <v-col
                        v-if="GetBool[newEvent.type].nationalität"
                        cols="12"
                        sm="2"
                        md="2"
                      >
                        <v-select
                          v-model="newEvent.selectedNation"
                          :items="nationalität"
                          item-text="name"
                          item-value="tag"
                          label="Nationalität"
                        />
                      </v-col>
                      <v-col
                        v-if="GetBool[newEvent.type].relevanz"
                        cols="12"
                        sm="2"
                        md="2"
                      >
                        <v-select
                          v-model="newEvent.selectedRelevanz"
                          :items="relevanz"
                          item-text="name"
                          item-value="tag"
                          label="Relevanz"
                          multiple
                          chips
                          clearable
                          deletable-chips
                        />
                      </v-col>
                      <v-col
                        v-if="GetBool[newEvent.type].days"
                        cols="12"
                        sm="2"
                        md="2"
                      >
                        <v-select
                          v-model="newEvent.selectedDays"
                          :items="toselectDays"
                          label="Days of Event"
                          multiple
                          chips
                          clearable
                          deletable-chips
                        />
                      </v-col>
                    </v-row>
                    <v-divider
                      class="my-5"
                    />
                    <v-row>
                      <v-col
                        v-if="GetBool[newEvent.type].relevanz"
                        cols="12"
                        sm="2"
                        md="2"
                      >
                        <v-text-field
                          v-model="newEvent.ort"
                          outlined
                          hide-details
                          label="Ort"
                        />
                      </v-col>
                    </v-row>
                    <v-divider
                      class="my-5"
                    />
                    <v-row>
                      <v-col
                        v-if="GetBool[newEvent.type].starttime"
                        cols="12"
                        sm="2"
                        md="4"
                      >
                        <v-data-table
                          :headers="headersTime"
                          :items="startTimeItems"
                        >
                          <template v-slot:item.gen="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.gen"
                              large
                            >
                              {{ props.item.gen }}
                              <template v-slot:input>
                                <v-select
                                  v-model="props.item.gen"
                                  :items="['m', 'w', 'a']"
                                  label="Categorie"
                                />
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.cat="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.cat"
                              large
                            >
                              {{ props.item.cat }}
                              <template v-slot:input>
                                <v-select
                                  v-model="props.item.cat"
                                  :items="newEvent.selectedCategories"
                                  label="Categorie"
                                />
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.day="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.day"
                              large
                            >
                              {{ props.item.day }}
                              <template v-slot:input>
                                <v-select
                                  v-model="props.item.day"
                                  :items="newEvent.selectedDays"
                                  label="Day"
                                />
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.time="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.time"
                              large
                            >
                              {{ props.item.time }}
                              <template v-slot:input>
                                <v-text-field
                                  v-model="props.item.time"
                                  type="time"
                                  outlined
                                  hide-details
                                  label="time"
                                />
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:footer>
                            <v-divider
                              class="my-3"
                            />
                            <div class="d-flex justify-center">
                              <v-btn
                                class="mb-3"
                                color="blue"
                                small
                                @click="addRow()"
                                v-text="'Add Row'"
                              />
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="deleteRow(item)"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                  </template>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this Event?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-menu
          v-if="false"
          top
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-dots-horizontal
            </v-icon>
          </template>

          <v-list
            dense
          >
            <v-list-item>
              <v-list-item-avatar
                style="height: inherit;"
              >
                <v-icon>
                  mdi-account-cancel
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Account Blockieren</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import firebase from 'firebase/app'
  import { get } from 'vuex-pathify'
  import db from '../Firebase/init'

  export default {
    name: 'RegularTablesView',

    components: {
      DefaultEventDialog: () => import(
        /* webpackChunkName: "default-account" */
        '../layouts/default/widgets/EventDialog.vue'
      ),
    },

    data () {
      return {
        inset: true,
        daterange: {
          menu1: false,
          menu: false,
          start: '',
          end: '',
        },
        files: [],
        expanded: [],
        forceupdate: 0,
        loading: false,
        search: '',
        searchdokuments: '',
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialogDelete: false,
        headersTime: [
          { text: 'Day', value: 'day', groupable: false, sortable: false },
          { text: 'Categorie', value: 'cat', groupable: false, sortable: false },
          { text: 'Gender', value: 'gen', groupable: false, sortable: false },
          { text: 'Time', value: 'time', sortable: false, groupable: false },
          { text: '', align: 'end', value: 'actions', sortable: false, groupable: false },
        ],
        startTimeItems: [
          { day: '', cat: '', gen: '', time: '' },
        ],
        defaultstartTimeItems: [
          { day: '', cat: '', time: '' },
        ],
        headersdokuments: [
          { text: 'ID', align: 'start', value: 'ID', groupable: false },
          { text: 'Name', value: 'title', groupable: false },
          { text: 'Aktionen', align: 'end', value: 'actions', sortable: false, groupable: false },
        ],
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'ID',
            groupable: false,
          },
          { text: 'Event', value: 'Title', groupable: false },
          { text: 'Type', value: 'filter.event' },
          { text: 'Datum', value: 'Datum', groupable: false },
          { text: 'Ort', value: 'ort' },
          { text: 'Categorien', value: 'filter.cat' },
          { text: 'Region', value: 'filter.region' },
          { text: 'Relevanz', value: 'filter.relevanz' },
          { text: 'Aktionen', value: 'actions', sortable: false, groupable: false },
          { text: '', value: 'data-table-expand', groupable: false },
        ],
        editedIndex: -1,
        editedItem: {
          ID: '',
          title: '',
          subtitle: '',
          email: '',
          tag: '',
        },
        defaultItem: {
          ID: '',
          title: '',
          subtitle: '',
          email: '',
          tag: '',
        },
        cat: [
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
        eventtype: [
          { name: 'Turnier', tag: 'turnier' },
          { name: 'Lager', tag: 'lager' },
          { name: 'Leistungs Test', tag: 'test' },
          { name: 'Brassard', tag: 'brassard' },
          { name: 'Anlass', tag: 'anlass' },
          { name: 'Ferien', tag: 'ferien' },
          { name: 'Anderes', tag: 'anderes' },
        ],
        region: [
          { name: 'Lokal', tag: 'loc' },
          { name: 'Regional', tag: 'reg' },
          { name: 'National', tag: 'nat' },
          { name: 'Kontinental', tag: 'kon', tooltip: 'Europa' },
          { name: 'Global', tag: 'glo' },
        ],
        relevanz: [
          { name: 'keine', tag: 'keinrang' },
          { name: 'Selektions Rangliste', tag: 'selrang' },
          { name: 'Nationale Rangliste', tag: 'natrang' },
          { name: 'Europaweite Rangliste', tag: 'eurorang' },
          { name: 'Globale Rangliste', tag: 'globrang' },
        ],
        nationalität: [
          { name: 'Man muss Schweizer sein', tag: 'swiss' },
          { name: 'keine spezifische Nationalität erforderlich', tag: 'nonswiss' },
        ],
        newEvent: {
          type: 'turnier',
          title: '',
          beschreibung: '',
          dokument: '',
          region: '',
          selectedCategories: [],
          selectedNation: '',
          selectedRelevanz: [],
          selectedDays: [],
          ort: '',
        },
        defaultnewEvent: {
          type: 'turnier',
          title: '',
          beschreibung: '',
          dokument: '',
          region: '',
          selectedCategories: [],
          selectedNation: '',
          selectedRelevanz: [],
          selectedDays: [],
          ort: '',
        },
        toselectDays: [
          'Montag',
          'Dienstag',
          'Mittwoch',
          'Donerstag',
          'Freitag',
          'Samstag',
          'Sonntag',
        ],
        GetBool: {
          turnier: { dokument: true, categorie: true, region: true, nationalität: true, relevanz: true, days: true, starttime: true },
          lager: { dokument: true, categorie: true, region: true, nationalität: true, relevanz: false, days: false, starttime: false },
          test: { dokument: true, categorie: true, region: false, nationalität: false, relevanz: false, days: false, starttime: false },
          brassard: { dokument: true, categorie: true, region: false, nationalität: false, relevanz: false, days: true, starttime: true },
          anlass: { dokument: true, categorie: true, region: false, nationalität: false, relevanz: false, days: false, starttime: false },
          ferien: { dokument: false, categorie: false, region: false, nationalität: false, relevanz: false, days: false, starttime: false },
          anderes: { dokument: false, categorie: true, region: false, nationalität: false, relevanz: false, days: false, starttime: false },
        },
      }
    },

    computed: {
      theme () {
        return this
          .$vuetify
          .theme
          .dark
          ? 'dark'
          : 'light'
      },
      ...get('userfirebase', [
        'events',
        'turnierausschreibungen',
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Event' : 'Edit Event'
      },
      selectedAllCategories () {
        return this.newEvent.selectedCategories.length === this.cat.length
      },
      selectedSomeCategories () {
        return this.newEvent.selectedCategories.length > 0 && !this.selectedAllCategories
      },
      icon () {
        if (this.selectedAllCategories) return 'mdi-close-box'
        if (this.selectedSomeCategories) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.selectedAllCategories) {
            this.newEvent.selectedCategories = []
          } else {
            this.cat.forEach((e) => {
              if (!(this.newEvent.selectedCategories.includes(e.tag))) {
                this.newEvent.selectedCategories.push(e.tag)
              }
            })
          }
        })
      },
      deletFile (filename) {
        console.log(filename)
        var desertRef = firebase.storage().ref().child('Turnierausschreibungen/' + filename)
        // Delete the file
        desertRef.delete().then(() => {
          console.log('goood')
          // File deleted successfully
        }).catch((error) => {
          console.log(error)
          // Uh-oh, an error occurred!
        })
      },
      uploadFile () {
        console.log(this.files)
        if (this.files.length !== 0) {
          console.log('yes')
          var filename = this.files.name
          firebase.storage().ref().child('Turnierausschreibungen/' + filename).put(this.files)
          this.files = []
        }
      },
      convertDate (date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return date.toDate().toLocaleDateString('de-DE', options)
      },
      update () {
        this.loading = true
        this.$store.commit({ type: 'userfirebase/updateAllData' })
        setTimeout(() => {
          this.loading = false
          this.forceupdate++
        }, 2000)
      },

      deleteRow (item) {
        if (this.startTimeItems.length > 1) {
          const index = this.startTimeItems.indexOf(item)
          this.startTimeItems.splice(index, 1)
        }
      },

      addRow () {
        this.startTimeItems.push({ day: '', cat: '', gen: '', time: '' })
        console.log(this.startTimeItems)
      },

      editItem (item) {
        this.editedIndex = -1
        this.editedIndex = this.events.indexOf(item)
        this.newEvent = {
          type: item.filter.event,
          title: item.Title,
          beschreibung: item.beschreibung,
          dokument: item.turnierausschreibung,
          region: item.filter.region,
          selectedCategories: item.filter.cat,
          selectedNation: item.filter.nationalität,
          selectedRelevanz: item.filter.relevanz,
          selectedDays: item.days,
          ort: item.ort,
        }
        this.daterange = {
          menu1: false,
          menu: false,
          start: item.Datum[0].toDate().toLocaleDateString('us-US'),
          end: item.Datum[1].toDate().toLocaleDateString('us-US'),
        }
        this.startTimeItems = item.startzeiten
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deletenewEvent(this.events[this.editedIndex].uid)
        this.update()
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.editedIndex = -1
        this.reset()
      },

      reset () {
        this.newEvent = {
          type: 'turnier',
          title: '',
          beschreibung: '',
          dokument: '',
          region: '',
          selectedCategories: [],
          selectedNation: '',
          selectedRelevanz: [],
          selectedDays: [],
          ort: '',
        }
        this.daterange = {
          menu1: false,
          menu: false,
          start: '',
          end: '',
        }
        this.startTimeItems = this.defaultstartTimeItems
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedIndex = -1
          this.reset()
        })
      },
      save () {
        console.log(this.newEvent, this.startTimeItems, this.daterange)
        if (this.editedIndex === -1) {
          this.savenewEvent()
        } else {
          this.saveeditEvent(this.events[this.editedIndex].uid)
        }
        this.update()
        this.close()
      },
      async savenewEvent () {
        try {
          await db.collection('events').add({
            Datum: [firebase.firestore.Timestamp.fromDate(new Date(this.daterange.start)), firebase.firestore.Timestamp.fromDate(new Date(this.daterange.end))],
            Title: this.newEvent.title,
            beschreibung: this.newEvent.beschreibung,
            filter: {
              cat: this.newEvent.selectedCategories,
              event: this.newEvent.type,
              nationalität: this.newEvent.selectedNation,
              region: this.newEvent.region,
              relevanz: this.newEvent.selectedRelevanz,
            },
            ort: this.newEvent.ort,
            days: this.newEvent.selectedDays,
            startzeiten: this.startTimeItems,
            turnierausschreibung: this.newEvent.dokument,
          })
        } catch (error) {
          console.log(error)
          this.error = error.message
        }
      },
      async saveeditEvent (id) {
        try {
          await db.collection('events').doc(id).set({
            Datum: [firebase.firestore.Timestamp.fromDate(new Date(this.daterange.start)), firebase.firestore.Timestamp.fromDate(new Date(this.daterange.end))],
            Title: this.newEvent.title,
            beschreibung: this.newEvent.beschreibung,
            filter: {
              cat: this.newEvent.selectedCategories,
              event: this.newEvent.type,
              nationalität: this.newEvent.selectedNation,
              region: this.newEvent.region,
              relevanz: this.newEvent.selectedRelevanz,
            },
            ort: this.newEvent.ort,
            days: this.newEvent.selectedDays,
            startzeiten: this.startTimeItems,
            turnierausschreibung: this.newEvent.dokument,
          })
        } catch (error) {
          console.log(error)
          this.error = error.message
        }
      },
      async deletenewEvent (id) {
        try {
          await db.collection('events').doc(id).delete()
        } catch (error) {
          console.log(error)
          this.error = error.message
        }
      },
    },
  }
</script>
<style>
</style>
