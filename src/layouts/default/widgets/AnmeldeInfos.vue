<template>
  <div>
    <template v-if="available">
      <v-row
        class="pb-4 pt-5"
      >
        <v-col
          class="text-center"
          align-self="center"
        >
          <v-card
            class="pa-4 pb-5 elevation-4"
          >
            <v-btn
              class="rounded-l rounded-r-0 elevation-3"
              :disabled="angemeldet"
              @click="changeAnmeldeState"
            >
              Anmelden
            </v-btn>
            <v-btn
              class="rounded-r rounded-l-0 elevation-3"
              :disabled="!angemeldet"
              @click="changeAnmeldeState"
            >
              Abmelden
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col
          v-if="angemeldet"
          class="pt-10 pb-7 text-center"
          align-self="center"
        >
          <div>
            <span
              class="green--text font-weight-black"
              style="font-size: 1.6em"
            >! Du nimmst damit am Event teil !</span>
          </div>
        </v-col>
        <v-col
          v-else
          class="pt-10 pb-7 text-center"
          align-self="center"
        >
          <div>
            <span
              class="red--text font-weight-black"
              style="font-size: 1.6em"
            >! Du nimmst damit nicht am Event teil !</span>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          v-if="angemeldet"
          class="d-flex justify-center text-center pt-0"
          align-self="center"
        >
          <v-row>
            <v-col
              v-if="needsmaterial"
              class="d-flex justify-center text-center"
            >
              <v-card
                class="text-center"
                flat
                max-width="70%"
              >
                <v-divider />
                <v-container>
                  <v-row>
                    <v-col>
                      <v-row>
                        <v-col
                          class="pb-0 text-h5 font-weight-black"
                        >
                          In der Kategorie {{ categorie(geb, 'shortend') }} benötigst du:
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="pt-0 red--text font-weight-light text--secondary"
                          style="font-size: 0.7rem; letter-spacing: 0.03rem"
                        >
                          Wenn du etwas untengennanntes
                          <span class="font-weight-black red--text"> nicht </span>
                          in der Anzahl
                          <span class="font-weight-black red--text"> besitzt</span>,
                          <span class="font-weight-black red--text"> setzte kein Hacken</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-container>
                        <v-checkbox
                          v-model="selected"
                          value="Degen"
                          color="green darken-3"
                          hide-details
                          dense
                        >
                          <template v-slot:label>
                            <div>
                              min. 2 Degen der Grösse {{weaponsize(geb)}}
                            </div>
                          </template>
                        </v-checkbox>

                        <v-checkbox
                          v-model="selected"
                          value="Kabel"
                          color="green darken-3"
                          hide-details
                          dense
                        >
                          <template v-slot:label>
                            <div>
                              min. 2 Körperkabel
                            </div>
                          </template>
                        </v-checkbox>

                        <v-checkbox
                          v-for="(item, i) in meterialien"
                          :key="i"
                          v-model="selected"
                          :label="item"
                          :value="item"
                          color="green darken-3"
                          hide-details
                          dense
                        />

                        <v-checkbox
                          v-model="selected"
                          value="Reparatur"
                          color="green darken-3"
                          hide-details
                          dense
                        >
                          <template v-slot:label>
                            <div>
                              <v-text-field
                                v-model="reparaturen"
                                label="Reparaturen..."
                                name="reparaturen"
                              />
                            </div>
                          </template>
                        </v-checkbox>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col
          class="pt-9 pb-5 text-h5 font-weight-black text-center"
          align-self="center"
        >
          <div>
            <span class="red--text text-h4 font-weight-black">! Leider ist dieses Event nicht für dich !</span>
          </div>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
  import { categorie, weaponsize } from '../../../util/helpers'

  export default {
    props: {
      geb: {
        default: null,
      },
      available: {
        default: true,
      },
      needsmaterial: {
        default: true,
      },
      angemeldet: Boolean,
    },
    data () {
      return {
        numberofPlaces: 0,
        tab: null,
        selected: [],
        meterialien: [
          'Maske',
          'Jacke',
          'Plastron',
          'Brustschutz',
          'Hose',
          'Fechtsocken',
        ],
        reparaturen: '',
      }
    },

    methods: {
      categorie,
      weaponsize,
      changeAnmeldeState () {
        console.log(this.$emit('updateangemeldet'))
      },
    },
  }
</script>

<style>

</style>
