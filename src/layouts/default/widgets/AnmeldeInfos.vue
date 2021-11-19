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
              @click="angemeldet = !angemeldet"
            >
              Anmelden
            </v-btn>
            <v-btn
              class="rounded-r rounded-l-0 elevation-3"
              :disabled="!angemeldet"
              @click="angemeldet = !angemeldet"
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
                          <span class="font-weight-black red--text"> setzte ein Kreuz</span>
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
                          on-icon="mdi-close-box"
                          off-icon="mdi-checkbox-marked"
                          color="pink darken-4"
                          hide-details
                          dense
                        >
                          <template v-slot:label>
                            <div>
                              min. 2 Degen der Grösse {{ weaponsize(geb) }}
                            </div>
                          </template>
                        </v-checkbox>

                        <v-checkbox
                          v-model="selected"
                          value="Kabel"
                          on-icon="mdi-close-box"
                          off-icon="mdi-checkbox-marked"
                          color="pink darken-4"
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
                          on-icon="mdi-close-box"
                          off-icon="mdi-checkbox-marked"
                          color="pink darken-4"
                          hide-details
                          dense
                        />

                        <v-checkbox
                          v-model="selected"
                          value="Reparatur"
                          color="green darken-4"
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
      // eslint-disable-next-line vue/require-prop-types
      geb: {
        default: null,
      },
      available: {
        type: Boolean,
        default: true,
      },
      needsmaterial: {
        type: Boolean,
        default: true,
      },
      angemeldet1: Boolean,
      selected1: Array,
      reparaturen1: String,
    },
    data () {
      return {
        numberofPlaces: 0,
        tab: null,
        angemeldet: this.angemeldet1,
        selected: this.selected1,
        meterialien: [
          'Maske',
          'Jacke',
          'Plastron',
          'Brustschutz',
          'Hose',
          'Fechtsocken',
        ],
        reparaturen: this.reparaturen1,
      }
    },

    watch: {
      selected (val, oldval) {
        this.$emit('update:selected1', val)
      },
      angemeldet (val, oldval) {
        this.$emit('update:angemeldet1', val)
      },
      reparaturen (val, oldval) {
        this.$emit('update:reparaturen1', val)
      },

    },

    mounted () {
      // if (this.selected1 !== undefined) {
      //   this.selected = Array.from(this.selected1)
      // }
    },

    methods: {
      categorie,
      weaponsize,
    },
  }
</script>

<style>

</style>
