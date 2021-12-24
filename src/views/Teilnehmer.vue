<template>
  <v-container
    id="teilnehmer-view"
    fluid
    tag="section"
  >
    <v-icon>
      mdi-chevron-left
    </v-icon>
    <router-link
      to="/events"
    >
      zurück zur Liste
    </router-link>
    <view-intro
      color="black--text"
      :heading="event.Title"
      style="height: 200px"
    />
    <template
      v-if="GetBool[event.filter.event].starttime"
    >
      <template
        v-for="(element, i) in event.startzeiten"
      >
        <div
          :key="i"
          class="mb-10 pb-10"
        >
          <default-teilnehmer-categorie
            :cat="element.cat"
            :day="element.day"
            :gen="element.gen"
            :anmeldungen="event.anmeldungen"
          />
        </div>
      </template>
    </template>
    <template
      v-if="GetBool[event.filter.event].all"
    >
      <div>
        <default-teilnehmer-categorie
        :title="'Anmeldungen'"
        :anmeldungen="event.anmeldungen"
        />
      </div>
    </template>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  export default {
    name: 'Teilnehmer',
    data () {
      return {
        event: {
          filter: {
            event: 'turnier',
          },
        },
        GetBool: {
          turnier: { all: false, starttime: true },
          lager: { all: true, starttime: false },
          test: { all: true, starttime: false },
          brassard: { all: false, starttime: true },
          anlass: { all: true, starttime: false },
          ferien: { all: false, starttime: false },
          anderes: { all: true, starttime: false },
        },
      }
    },
    components: {
      DefaultTeilnehmerCategorie: () => import(
        /* webpackChunkName: "default-account" */
        '../layouts/default/widgets/TeilnehmerCategorie'
      ),
    },
    computed: {
      ...get('userfirebase', [
        'events',
        'turnierausschreibungen',
      ]),
    },
    mounted () {
      console.log(this.$route)
      this.$store.commit({ type: 'userfirebase/updateAllData' })
      this.event = this.events.find((x) => {
        return this.$route.params.eventid === x.uid
      })
      console.log(this.event)
    },
    methods: {
      //
    },
  }
</script>

<style>

</style>
