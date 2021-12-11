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
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
  import { stringDatetoTimestamp, categorie, convertDate } from '../../../util/helpers'
  import { useUsers } from '../../../Firebase/init'
  const { getInfUser } = useUsers()

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
      anmeldungen: Object,
    },
    data () {
      return {
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
      }
    },
    mounted () {
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
    methods: {
      getTitle (cat) {
        return categorie(stringDatetoTimestamp(cat), 'shortend')
      },
      async filterAnmeldung () {
        for (const property in this.anmeldungen.userinfos) {
          console.log(this.anmeldungen.userinfos[property])
          if (this.anmeldungen.userinfos[property].cat === this.cat) {
            await getInfUser(property).then((doc) => {
              var dateArray = convertDate(this.anmeldungen.userinfos[property].registriertAm, 2).split(' ')
              console.log(dateArray)
              var itemdata = {
                name: doc.privat.nachName.toUpperCase() + ' ' + doc.privat.firstName.charAt(0).toUpperCase() + doc.privat.firstName.slice(1).toLowerCase(),
                jahrgang: doc.privat.geburtsdatum.toDate().getFullYear(),
                status: this.anmeldungen.userinfos[property].status,
                angam: dateArray[1],
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
          console.log(this.anmeldungen.userinfos[property])
          await getInfUser(property).then((doc) => {
            var dateArray = convertDate(this.anmeldungen.userinfos[property].registriertAm, 2).split(' ')
            console.log(dateArray)
            var itemdata = {
              name: doc.privat.nachName.toUpperCase() + ' ' + doc.privat.firstName.charAt(0).toUpperCase() + doc.privat.firstName.slice(1).toLowerCase(),
              jahrgang: doc.privat.geburtsdatum.toDate().getFullYear(),
              angam: dateArray[1],
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
