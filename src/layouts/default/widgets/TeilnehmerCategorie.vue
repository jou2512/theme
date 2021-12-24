<template>
  <div>
    <template
      v-if="cat"
    >
        <p class="text-h2">{{ gender[gen] }} {{ getTitle(cat) }} | {{ day }}</p>
    </template>
    <template
      v-if="title"
    >
        <p class="text-h2">{{ title }}</p>
    </template>
    <v-card
      :loading="loading"
      :key="forceupdate"
      class="elevation-0"
      color="#eff1f7"
    >
      <v-card-title
        class="pt-5"
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        hide-default-footer
        color="#eff1f7"
        dense
        @dblclick:row="show"
      ></v-data-table>
    </v-card>
    <v-dialog
      v-if="!(this.title)"
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-toolbar
          dark
        >{{ item.name }} - {{ item.jahrgang }} | {{ getTitle(item.cat) }} <br> {{ item.angam }}</v-toolbar>
        <v-card-title class="text-h5">
          {{ getMaterialTitle().title }}
        </v-card-title>

        <v-card-text>
          <v-data-table
            :key="keyIndex"
            :headers="Materialheaders"
            :items="item.data"
            hide-default-footer
            color="#eff1f7"
            dense
            dark
            @dblclick:row="switchState"
          ></v-data-table>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="black"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="white--text"
            color="black"
            @click="saveNewState"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <sweet-modal
      ref="modal"
      icon="success"
      blocking="true"
      pulse-on-block="false"
      hide-close-button="true"
    >
      done!
    </sweet-modal>
  </div>
</template>

<script>
  import { stringDatetoTimestamp, categorie, convertDate } from '../../../util/helpers'
  import { useUsers, useEvent } from '../../../Firebase/init'
  import { get } from 'vuex-pathify'
  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

  const { getInfUser } = useUsers()
  const { updateAnmeldeState } = useEvent()

  export default {
    props: {
      title: String,
      cat: {
        type: String,
        default: '',
      },
      day: {
        type: String,
        default: '',
      },
      gen: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        anmeldungen: {},
        forceupdate: 0,
        loading: false,
        keyIndex: 0,
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            filterable: true,
            groupable: false,
            value: 'name',
          },
          {
            text: 'Jahrgang',
            align: 'start',
            filterable: true,
            groupable: true,
            value: 'jahrgang',
          },
          {
            text: 'Status',
            align: 'start',
            filterable: true,
            groupable: true,
            value: 'status',
          },
          {
            text: 'Angemeldet Am',
            align: 'start',
            filterable: true,
            groupable: true,
            value: 'angam',
          },
        ],
        items: [],
        gender: {
          m: 'Herren',
          w: 'Damen',
          a: '',
        },
        dialog: false,
        item: {
          cat: 'u8',
          data: {
            material: {
              mat: [],
              done: [],
            },
          },
        },
        Materialheaders: [
          {
            text: 'Noch Gebraucht',
            align: 'center',
            filterable: false,
            groupable: false,
            value: 'mat',
          },
          {
            text: 'Fertig',
            align: 'center',
            filterable: false,
            groupable: false,
            value: 'done',
          },
        ],
        Reparaturheaders: [
          {
            text: 'zur Reparatur',
            align: 'center',
            filterable: false,
            groupable: false,
            value: 'name',
          },
          {
            text: 'fertig Repariert',
            align: 'center',
            filterable: false,
            groupable: false,
            value: 'jahrgang',
          },
        ],
        index: 0,
      }
    },
    components: {
      SweetModal,
      SweetModalTab,
    },
    mounted () {
      this.getData()
      console.log(this.anmeldungen)
      if (!(this.title)) {
        this.filterAnmeldung()
      } else {
        this.headers = [
          {
            text: 'Name',
            align: 'start',
            filterable: true,
            groupable: false,
            value: 'name',
          },
          {
            text: 'Jahrgang',
            align: 'start',
            filterable: true,
            groupable: true,
            value: 'jahrgang',
          },
          {
            text: 'Angemeldet Am',
            align: 'center',
            filterable: true,
            groupable: true,
            value: 'angam',
          },
        ]
        this.sortAnmeldung()
      }
    },
    computed: {
      ...get('userfirebase', [
        'events',
      ]),
    },
    methods: {
      getData () {
        this.event = this.events.find((x) => {
          return this.$route.params.eventid === x.uid
        })
        this.anmeldungen = this.event.anmeldungen
      },
      getMaterialTitle () {
        switch (this.item.status) {
          case 'Hatt Alles':
            return { title: 'Es muss nichts gemacht werden', id: 0 }

          case 'Es fehlt Material':
            return { title: 'Es muss Material besorgt werden', id: 1 }

          case 'Material Reparatur':
            return { title: 'Es muss Material repariert werden', id: 2 }

          case 'Reparatur und Material':
            return { title: 'Es muss Material besorgt und Repartiert werden', id: 3 }

          default:
            return { title: '', id: -1 }
        }
      },
      getTitle (cat) {
        return categorie(stringDatetoTimestamp(cat), 'shortend')
      },
      show (event, itemData) {
        console.log(itemData.item)
        this.item = itemData.item
        this.item.data = []
        this.anmeldungen.userinfos[itemData.item.uid].material.mat.forEach(element => {
          this.item.data.push({ mat: element, done: '' })
        })
        this.anmeldungen.userinfos[itemData.item.uid].material.done.forEach(element => {
          this.item.data.push({ mat: '', done: element })
        })
        this.dialog = true
      },
      switchState (event, itemData) {
        this.index = this.item.data.findIndex(element => element === itemData.item)
        var passObject = Object.assign({}, { mat: '', done: '' })
        passObject.done = itemData.item.mat
        passObject.mat = itemData.item.done
        this.item.data[this.index] = passObject
        this.keyIndex++
      },
      async saveNewState () {
        var check = false
        this.loading = true
        var material = []
        var done = []
        this.item.data.forEach(element => {
          console.log(element)
          if (element.mat === '') {
            done.push(element.done)
          } else {
            material.push(element.mat)
          }
        })
        if (!(this.areEqual(material, this.anmeldungen.userinfos[this.item.uid].material.mat))) { check = true }
        console.log(material, this.anmeldungen.userinfos[this.item.uid].material.mat)
        console.log(check)
        if (check) {
          await updateAnmeldeState(this.item.uid, this.$route.params.eventid, material, done).then(() => {
            this.$store.commit({ type: 'userfirebase/updateAllData' })
            this.dialog = false
            this.$refs.modal.open()
            setTimeout(() => {
              this.getData()
              this.items = []
              if (!(this.title)) {
                this.filterAnmeldung()
              } else {
                this.sortAnmeldung()
              }
              this.loading = false
              this.forceupdate++
              this.keyIndex++
              this.$refs.modal.close()
            }, 3000)
          })
        }
      },
      areEqual (arr1, arr2) {
        const n = arr1.length
        const m = arr2.length

        // If lengths of array are not equal means
        // array are not equal
        if (n !== m) { return false }

        // Sort both arrays
        arr1.sort()
        arr2.sort()

        // Linearly compare elements
        for (let i = 0; i < n; i++) {
          if (arr1[i] !== arr2[i]) {
            return false
          }
        }

        // If all elements were same.
        return true
      },
      async filterAnmeldung () {
        for (const property in this.anmeldungen.userinfos) {
          console.log('Userinfos', this.anmeldungen.userinfos[property])
          console.log('propertys', property)
          if (this.anmeldungen.userinfos[property].cat === this.cat) {
            await getInfUser(property).then((doc) => {
              var dateArray = convertDate(this.anmeldungen.userinfos[property].registriertAm, 2).split(' ')
              console.log(dateArray)
              var itemdata = {
                name: doc.privat.nachName.toUpperCase() + ' ' + doc.privat.firstName.charAt(0).toUpperCase() + doc.privat.firstName.slice(1).toLowerCase(),
                jahrgang: doc.privat.geburtsdatum.toDate().getFullYear(),
                status: this.anmeldungen.userinfos[property].status,
                angam: dateArray[1],
                uid: property,
                cat: this.anmeldungen.userinfos[property].cat,
              }
              console.log('Itemdata', itemdata)
              if (this.gen === 'm' && doc.privat.gender === 'männlich') {
                this.items.push(itemdata)
              } else if (this.gen === 'w' && doc.privat.gender === 'weiblich') {
                this.items.push(itemdata)
              } else if (this.gen === 'a') {
                this.items.push(itemdata)
              }
            })
          }
        }
        console.log('Items', this.items)
      },
      async sortAnmeldung () {
        for (const property in this.anmeldungen.userinfos) {
          console.log('Userinfos', this.anmeldungen.userinfos[property])
          await getInfUser(property).then((doc) => {
            var dateArray = convertDate(this.anmeldungen.userinfos[property].registriertAm, 2).split(' ')
            console.log(dateArray)
            var itemdata = {
              name: doc.privat.nachName.toUpperCase() + ' ' + doc.privat.firstName.charAt(0).toUpperCase() + doc.privat.firstName.slice(1).toLowerCase(),
              jahrgang: doc.privat.geburtsdatum.toDate().getFullYear(),
              angam: dateArray[1],
              uid: property,
            }
            console.log('Itemdata', itemdata)
            this.items.push(itemdata)
          })
        }
        console.log('Items', this.items)
      },
    },
  }
</script>

<style scoped>
  .theme--light.v-data-table {
    background-color: none !important;
  }

</style>
