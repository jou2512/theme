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
        <span class="text-h3 white--text">{{ title }}</span>
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
                            <span class="text-h4 font-weight-bold">Informationen - {{ event }} {{ ort }}</span>
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
                            <span class="text-subtitle-1">{{ datum }}</span>
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
                            dokument="https://firebasestorage.googleapis.com/v0/b/fechtgesellschaft-1.appspot.com/o/Turnierausschreibungen%2FPROGRAMM%20BASLER%20MEISTERSCHAFTEN%202021.pdf?alt=media&token=3c2aa649-a60d-4506-a5d1-65384a6d8084"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-subheader>Details</v-subheader>
                          <v-card>
                            Hey Ich wollte Vorschlagen sich um etwa 6:30 bei der Fechtgesellschaft zu treffen.
                            Ich würde die Kinder hinfahren und dann in der Stadt noch ein wenig Shoppen gehen, während die Trainer auf sie Aufpassen.
                            Und sie Danach wieder nach hause fahren, ich werde euch dann hier Bescheid geben wenn wir alle fertig sind.
                            Währe dies für alle in Ordnung?
                          </v-card>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-subheader>Karte</v-subheader>
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.746727715511!2d8.538133915875122!3d47.37786151174394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08cc0e6e41%3A0xf5c698b65f8c52a7!2sZ%C3%BCrich%20Hauptbahnhof!5e0!3m2!1sde!2sch!4v1631024969155!5m2!1sde!2sch"
                            width="400"
                            height="300"
                            style="border:0;"
                            allowfullscreen=""
                            loading="lazy"
                          >
                          </iframe>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row>
                        <v-col>

                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>

                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
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
  export default {
    name: 'TurnierDialog',

    props: {
      title: String,
      event: String,
      ort: String,
      datum: String,
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
      }
    },
  }
</script>

<style>

</style>
