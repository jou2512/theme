<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
    style="height: 100%"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      style="height: 100%"
    >
      <v-container
        fluid
        style="height: 100%"
        class="d-flex justify-center align-center"
      >
        <v-stepper
          v-model="e1"
          alt-labels
        >
          <v-stepper-header>
            <v-stepper-step
              :rules="[() => valid1]"
              :complete="e2 > 1"
              :editable="e2 > 1"
              step="1"
            >
              Persönliche Daten
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              :rules="[() => tab === 0 ? valid2 : valid22]"
              :complete="e2 >= 2"
              :editable="e2 >= 2 && !(Administartion)"
              step="2"
            >
              Elternteil / Fechter
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              :rules="[() => valid3]"
              :complete="e2 >= 3"
              :editable="e2 >= 3"
              step="3"
            >
              Addresse
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-form
              ref="form1"
              v-model="valid1"
              lazy-validation
              style="height: 100%"
            >
              <v-stepper-content
                step="1"
              >
                <v-card
                  class="mb-12"
                  max-height="400px"
                >
                  <v-card-text>
                    <v-row
                      class="height=100%"
                    >
                      <v-col>
                        <v-text-field
                          v-model="username"
                          color="blue"
                          :rules="usernameRules"
                          :error-messages="UsernameError"
                          :counter="15"
                          label="Username"
                          hide-details="auto"
                          required
                          outlined
                          prepend-icon="mdi-account-circle"
                          hint="Wähle dein Username"
                          persistent-hint
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="vorname"
                          color="blue"
                          :rules="nameRules"
                          :error-messages="FirstNameError"
                          label="Vorname"
                          required
                          outlined
                          hide-details="auto"
                          hint="Wie ist dein Vorname"
                          persistent-hint
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="familienname"
                          color="blue"
                          :rules="nameRules"
                          :error="LastNameError"
                          label="Familienname"
                          required
                          outlined
                          hide-details="auto"
                          hint="wie ist dein Familienname"
                          persistent-hint
                        />
                      </v-col>
                    </v-row>
                    <v-row
                      v-if="Administartion"
                      class="height=100%"
                    >
                      <v-col>
                        <v-menu
                          ref="privat"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              color="blue"
                              label="Birthday date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              required
                              v-on="on"
                              hint="Wann hast du Geburtstag?"
                              persistent-hint
                            />
                          </template>
                          <v-date-picker
                            v-model="date"
                            color="#2E7D32"
                            first-day-of-week="1"
                            locale="de-DE"
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                            min="1900-01-01"
                            @change="save2"
                          />
                        </v-menu>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="gender"
                          :items="geschlechter"
                          hide-details="auto"
                          required
                          outlined
                          hint="Welches Geschlecht hast du?"
                          persistent-hint
                        />
                      </v-col>
                    </v-row>
                    <v-checkbox
                      v-model="checkboxAuto"
                      class="mt-1 mb-5"
                      dense
                      label="Ich besitze ein Auto"
                      hint="Hast du ein Auto mit dem du Fahren kannst?"
                      persistent-hint
                    />
                    <p
                      class="blue-text text-caption pointer"
                      @click="checkRights"
                    >
                      i got a spezial code
                    </p>
                  </v-card-text>
                </v-card>

                <v-btn
                  color="primary"
                  @click="nextstep(2), validate1()"
                >
                  Continue
                </v-btn>
              </v-stepper-content>
            </v-form>
            <v-stepper-content step="2">
              <v-card
                class="mb-12"
              >
                <v-card-text>
                  <v-tabs
                    v-model="tab"
                    class="d-flex justify-center"
                    align-with-title
                  >
                    <v-tabs-slider color="yellow" />

                    <v-tab>
                      Ich bin ein Elternteil
                    </v-tab>
                    <v-tab>
                      Ich fechte Persönlich
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-form
                      ref="form2"
                      v-model="valid2"
                      lazy-validation
                      style="height: 100%"
                    >
                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-row>
                              <v-col>
                                <v-select
                                  v-model="anzkinder"
                                  :items="items"
                                  hide-details="auto"
                                  required
                                  solo
                                  @change="update"
                                  hint="Wie viele Kinder hast du die Fechten?"
                                  persistent-hint
                                />
                              </v-col>
                            </v-row>
                            <v-row
                              v-for="i in anzkinder"
                              :key="i"
                              class="height=100%"
                            >
                              <v-col>
                                <v-text-field
                                  v-model="kinder[i-1].vorname"
                                  color="blue"
                                  :rules="nameRules"
                                  label="Vorname"
                                  required
                                  outlined
                                  hide-details="auto"
                                  prepend-icon="mdi-account-circle"
                                  :hint="'Wie heist dein ' + i + '. Kind?'"
                                  persistent-hint
                                />
                              </v-col>
                              <v-col>
                                <v-menu
                                  :ref="`menu`"
                                  v-model="info[i-1].menu"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="info[i-1].date"
                                      readonly
                                      color="blue"
                                      label="Birthday"
                                      prepend-icon="mdi-calendar"
                                      v-bind="attrs"
                                      required
                                      v-on="on"
                                      @focus="setmenuon(i)"
                                      :hint="'Wann hat dein ' + i + '. Kind Geburtstag?'"
                                      persistent-hint
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="info[i-1].date"
                                    color="#2E7D32"
                                    first-day-of-week="1"
                                    locale="de-DE"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1900-01-01"
                                    @change="save"
                                  />
                                </v-menu>
                              </v-col>
                              <v-col>
                                <v-select
                                  v-model="kinder[i-1].gender"
                                  :items="geschlechter"
                                  hide-details="auto"
                                  required
                                  outlined
                                  :hint="'Welches Geschlecht hat dein ' + i + '. Kind?'"
                                  persistent-hint
                                />
                              </v-col>
                            </v-row>
                            <v-divider
                              class="mt-10"
                            />
                            <v-checkbox
                              v-model="checkboxPersoenlich"
                              class="mt-3 "
                              dense
                              label="Ich fechte auch Persönlich"
                              hint="Fechtest du als Vater / Mutter auch?"
                              persistent-hint
                            />
                            <v-row
                              class="height=100%"
                            >
                              <v-col>
                                <v-menu
                                  ref="privat"
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="date"
                                      color="blue"
                                      label="Birthday date"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      required
                                      v-on="on"
                                      hint="Wann hast du Geburtstag?"
                                      persistent-hint
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="date"
                                    color="#2E7D32"
                                    first-day-of-week="1"
                                    locale="de-DE"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1900-01-01"
                                    @change="save2"
                                  />
                                </v-menu>
                              </v-col>
                              <v-col>
                                <v-select
                                  v-model="gender"
                                  :items="geschlechter"
                                  hide-details="auto"
                                  required
                                  outlined
                                  hint="Welches Geschlecht hast du?"
                                  persistent-hint
                                />
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-form>
                    <v-form
                      ref="form22"
                      v-model="valid22"
                      lazy-validation
                      style="height: 100%"
                    >
                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <v-row
                              class="height=100%"
                            >
                              <v-col>
                                <v-menu
                                  ref="privat2"
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="date"
                                      color="blue"
                                      label="Birthday date"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      hint="Wann hast du Geburtstag?"
                                      persistent-hint
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="date"
                                    color="#2E7D32"
                                    first-day-of-week="1"
                                    locale="de-DE"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1900-01-01"
                                    @change="save3"
                                  />
                                </v-menu>
                              </v-col>
                              <v-col>
                                <v-select
                                  v-model="gender"
                                  :items="geschlechter"
                                  hide-details="auto"
                                  outlined
                                  hint="Welches Geschlecht hast du?"
                                  persistent-hint
                                />
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-form>
                  </v-tabs-items>
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                @click="nextstep(3), validate2()"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-form
              ref="form3"
              v-model="valid3"
              lazy-validation
              style="height: 100%"
            >
              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                >
                  <v-card-text>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="strasse"
                          color="blue"
                          :rules="streetRules"
                          label="Strasse"
                          required
                          outlined
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="hausnummer"
                          color="blue"
                          :rules="nummerRules"
                          label="Hausnummer"
                          required
                          outlined
                          hide-details="auto"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="ort"
                          color="blue"
                          :rules="ortRules"
                          label="Ort"
                          required
                          outlined
                          hide-details="auto"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="postleitzahl"
                          color="blue"
                          :rules="plzRules "
                          :counter="5"
                          label="Postleitzahl"
                          required
                          outlined
                          hide-details="auto"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-btn
                  color="success"
                  @click="validate"
                >
                  Registrierung abschliessen
                </v-btn>
              </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
  // Utilities
  import Vue from 'vue'
  import { sync } from 'vuex-pathify'
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import db, { useUsers } from '../../Firebase/init'
  import { isInteger } from 'lodash'
  // eslint-disable-next-line
  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })
  const { existsUsername, existNames } = useUsers()

  export default {
    name: 'DashboardView',
    components: {
    },

    data: () => ({
      e1: 1,
      e2: 1,
      tab: null,
      info: new Array({
        date: '',
        menu: false,
      }),
      menuon: 0,
      menu: false,
      menu1: false,
      menu2: false,
      valid: true,
      valid1: true,
      valid2: true,
      valid22: true,
      valid3: true,
      UsernameError: '',
      FirstNameError: '',
      LastNameError: false,
      usernameRules: [
        v => !!v || 'Username is required',
        v => !(/[^a-zA-Z\s0-9]/.test(v)) || 'Username darf keine Sonderzeichen enthalten',
        v => {
          if (/\d/g.test(v)) {
            return (v.match(/\d/g).length <= 4 && v.match(/\d/g).length > 0) || 'Username darf maximal 4 zahlen enthalten'
          }
          return true
        },
        v => (v.length <= 15) || 'Maximal 15 Zeichen',
        v => {
          if (/[A-z]/g.test(v)) {
            return (v.match(/[A-z]/g).length >= 3) || 'Username min. 3 Buchstaben enthalten'
          }
          return 'Username muss mindestens 5 Buchstaben enthalten'
        },
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => !(/[^a-zA-Z\s]/.test(v)) || 'Nur Buchstaben sind zugelassen',
        v => {
          if (/[A-z]/g.test(v)) {
            return (v.match(/[A-z]/g).length >= 3) || 'mindestens 3 Buchstaben'
          }
          return true
        },
      ],
      streetRules: [
        v => !!v || 'Street is required',
        v => !(/[^a-zA-Z\s]/.test(v)) || 'Nur Buchstaben sind zugelassen',
        v => {
          if (/[A-z]/g.test(v)) {
            return (v.match(/[A-z]/g).length >= 3) || 'mindestens 3 Buchstaben'
          }
          return true
        },
      ],
      nummerRules: [
        v => !!v || 'Housenumber is required',
        v => !(/[^a-zA-Z\s0-9]/.test(v)) || 'Nur Zahlen und ein max. 1 Buchstabe',
        v => {
          if (/[A-z]/g.test(v)) {
            return (v.match(/[A-z]/g).length <= 1) || 'max. 1 Buchstabe'
          }
          return true
        },
      ],
      ortRules: [
        v => !!v || 'field is required',
        v => !(/[^a-zA-Z\s]/.test(v)) || 'Nur Buchstaben sind zugelassen',
        v => {
          if (/[A-z]/g.test(v)) {
            return (v.match(/[A-z]/g).length >= 3) || 'mindestens 3 Buchstaben'
          }
          return true
        },
      ],
      plzRules: [
        v => !!v || 'Postcode is required',
        v => !(/[^0-9]/.test(v)) || 'Nur Zahlen sind zugelassen',
        v => {
          if (/\d/g.test(v)) {
            return v.match(/\d/g).length <= 5 || 'Nur PLZ mit max 5 Ziffern'
          }
          return true
        },
      ],
      anzkinder: 1,
      items: [1, 2, 3, 4, 5],
      geschlechter: ['männlich', 'weiblich'],
      checkboxAuto: false,
      checkboxPersoenlich: false,
      username: '',
      vorname: '',
      familienname: '',
      date: '',
      gender: 'männlich',
      kinder: new Array({
        vorname: '',
        geburtsdatum: '',
        gender: 'männlich',
      }),
      strasse: '',
      hausnummer: '',
      ort: '',
      postleitzahl: '',
      admin: false,
      Administartion: false,
      funktionen: [],
    }),

    computed: {
      currentTitle () {
        switch (this.step) {
          case 1:
            return 'Login'
          case 2:
            return 'Registrieren'
          default:
            return 'Account erstellt'
        }
      },
      ...sync('start', [
        'step',
      ]),
    },

    watch: {
      tab (val) {
        if (val === 1) {
          this.anzkinder = 0
          this.update()
        } else if (val === 0) {
          this.anzkinder = 1
          this.update()
        }
      },
    },

    methods: {
      async validate () {
        this.$refs.form.validate() ? console.log('success') : this.$refs.form.validate()
        await this.validate1()
        this.validate2()
        this.validate3()
        if (this.valid1) {
          await existsUsername(this.username).then(result => {
            console.log('result', result)
            if (result) {
              this.valid1 = false
              this.UsernameError = 'Der Username existiert bereits'
            }
          })
          await existNames(this.vorname, this.familienname).then(result => {
            console.log('result', result)
            if (result) {
              this.valid1 = false
              this.FirstNameError = 'Dein Name Existiert bereits'
              this.LastNameError = true
            }
          })

          if (this.valid1) {
            if (this.username === this.vorname | this.familienname === this.username) {
              this.valid1 = false
              this.UsernameError = 'Der Username sollte nicht der Vorname oder Nachname sein'
            }
          }

          if (!(this.valid1)) {
            setTimeout(() => {
              this.UsernameError = ''
              this.FirstNameError = ''
              this.LastNameError = false
            }, 5000)
          }
        }

        if (!this.valid1) {
          this.e1 = 1
        } else if ((this.tab === 0 ? !this.valid2 : !this.valid22) && !(this.Administartion)) {
          this.e1 = 2
        } else if (!this.valid3) {
          this.e1 = 3
        } else {
          await this.datatodatabase()
          this.step = 1
          this.$router.push('/start/')
        }
      },
      validate1 () {
        if (this.date === '' && this.Administartion) {
          this.valid1 = false
        } else {
          this.$refs.form1.validate() ? console.log('form1 okay') : this.$refs.form1.validate()
        }
      },
      validate2 () {
        if (this.tab === 0) {
          if (this.$refs.form2.validate()) {
            var bool = true
            for (let index = 0; index < this.anzkinder; index++) {
              if (this.info[index].date === '') {
                bool = false
              }
            }
            if (this.date === '') {
              bool = false
            }
            console.log(bool)
            bool ? this.$refs.form2.validate() : this.valid2 = false
          } else {
            this.$refs.form2.validate()
          }
        } else {
          console.log(this.$refs.form22.validate())
          if (this.$refs.form22.validate()) {
            this.date !== '' ? this.$refs.form22.validate() : this.valid22 = false
          } else {
            this.$refs.form22.validate()
          }
        }
      },
      validate3 () {
        this.$refs.form3.validate() ? console.log('form3 okay') : this.$refs.form3.validate()
      },
      async createChildrenLogin (kinder, index) {
        try {
          const dataBase = db.collection('users')
          var id = ''
          await dataBase.add({
            privat: {
              funktionen: ['fechter/in'],
              fechten: true,
              firstName: kinder.vorname.toLowerCase(),
              nachName: this.familienname.toLowerCase(),
              gender: kinder.gender,
              geburtsdatum: kinder.geburtsdatum,
              auto: false,
            },
            events: {
              eventsBes: 0,
            },
            kinder: [],
            parent: this.$route.params.id,
            login: {
              admin: this.admin,
              email: '',
              telefon: '',
              avatar: 'https://firebasestorage.googleapis.com/v0/b/fechtgesellschaft-1.appspot.com/o/profilbilder%2Fprofile-picture.jpg?alt=media&token=8abd74b4-8961-4cd5-9d7e-3bdc4533bd9c',
              completed: false,
              username: kinder.vorname.toLowerCase() + '' + index + '' + this.familienname.toLowerCase(),
              registriertAm: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            addresse: {
              strasse: this.strasse,
              hausnummer: this.hausnummer,
              ort: this.ort,
              postleitzahl: this.postleitzahl,
            },
          })
            .then((docRef) => {
              id = docRef.id + ''
            })
          return id
        } catch (error) {
          console.log(error)
        }
      },
      async datatodatabase () {
        try {
          const kinderIds = []
          if (!(this.Administartion)) {
            for (let i = 0; i < this.anzkinder; i++) {
              kinderIds[i] = await this.createChildrenLogin(this.kinder[i], i)
            }
          }
          const dataBase = db.collection('users').doc(this.$route.params.id)
          const fechten = (this.checkboxPersoenlich || this.tab === 1) && !(this.Administartion)

          if (fechten) this.funktionen.push('fechter/in')
          if (this.anzkinder > 0 && !(this.Administartion)) this.funktionen.push('elternteil')

          await dataBase.set({
            privat: {
              funktionen: this.funktionen,
              fechten: fechten,
              firstName: this.vorname.toLowerCase(),
              nachName: this.familienname.toLowerCase(),
              gender: this.gender,
              geburtsdatum: firebase.firestore.Timestamp.fromDate(new Date(this.date)),
              auto: this.checkboxAuto,
            },
            events: {
              eventsBes: 0,
            },
            kinder: kinderIds,
            login: {
              completed: true,
              username: this.username.toLowerCase(),
              registriertAm: firebase.firestore.Timestamp.fromDate(new Date()),
            },
            addresse: {
              strasse: this.strasse,
              hausnummer: this.hausnummer,
              ort: this.ort,
              postleitzahl: this.postleitzahl,
            },
          }, { merge: true })
            .catch((err) => {
              console.error(err)
            })
          console.log('good')
        } catch (error) {
          console.log(error)
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      nextstep (e) {
        if (e === 2 && this.Administartion === true) {
          if (this.e2 < e) {
            this.e2 = 3
            this.e1 = 3
            this.tab = 2
          } else {
            this.tab = 2
            this.e1 = 3
          }
        } else {
          if (this.e2 < e) {
            this.e2 = e
            this.e1 = e
          } else {
            this.e1 = e
          }
        }
      },
      update () {
        this.kinder = new Array(this.anzkinder)
        this.info = new Array(this.anzkinder)
        for (let index = 0; index < this.anzkinder; index++) {
          this.kinder[index] = {
            vorname: '',
            geburtsdatum: '',
            gender: 'männlich',
          }
          this.info[index] = {
            date: '',
            menu: false,
          }
        }
      },
      save (date) {
        this.$refs.menu[this.menuon].save(date)
        this.kinder[this.menuon].geburtsdatum = firebase.firestore.Timestamp.fromDate(new Date(this.info[this.menuon].date))
      },
      save2 (date) {
        this.$refs.privat.save(date)
      },
      save3 (date) {
        this.$refs.privat2.save(date)
      },
      setmenuon (set) {
        console.log(set)
        this.menuon = (set - 1)
      },
      checkRights () {
        var code = parseInt(prompt('Type in your Code: '))
        if (isInteger(code)) {
          var codes = {
            19891: function makeAdmin () {
              alert('Successfully added Admin Role')
              return { admin: true }
            },
            19892: function makeVorstandsmitglied () {
              alert('Successfully added `Vorstandsmitglied` Role')
              return { role: 'vorstandsmitglied' }
            },
            19893: function makeMaître () {
              alert('Successfully added `Maître` Role')
              return { role: 'maître' }
            },
            19894: function makeErwachsenenTrainer () {
              alert('Successfully added `Erwachsenen Trainer` Role')
              return { role: 'erwachsenen trainer' }
            },
            19895: function makeJugendTrainer () {
              alert('Successfully added `Jugend Trainer` Role')
              return { role: 'jugend trainer' }
            },
          }
          if (Object.prototype.hasOwnProperty.call(codes, code)) {
            var code2 = parseInt(prompt('Type 1 for Administartion Member, 2 for Fencer / Parent: '))
            if (isInteger(code2) && (code2 === 1 || code2 === 2)) {
              var results = codes[code]()
              if (results.admin) this.admin = results.admin
              this.Administartion = code2 === 1
              if (results.role && !(this.funktionen.includes(results.role))) this.funktionen.push(results.role)
              console.log(this.funktionen)
            } else {
              alert('This Input is not a valid')
            }
          } else {
            alert('This Code is not a valid')
          }
        }
      },
    },
  }
</script>

<style lang="sass" scoped>
  .pointer
    cursor: pointer
</style>
