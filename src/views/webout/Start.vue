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
        <v-card
          class="mx-auto"
          width="360px"
          max-height="700px"
        >
          <v-card-title
            class="text-h6 font-weight-regular justify-space-between"
          >
            <span>{{ currentTitle }}</span>
          </v-card-title>

          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  color="blue"
                  label="E-mail"
                  required
                  prepend-icon="mdi-account-circle"
                />
                <v-text-field
                  v-model="password"
                  required
                  color="blue"
                  label="Password"
                  :type="showPassword ? '' : 'password'"
                  prepend-icon="mdi-lock"
                  :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
                <v-checkbox
                  v-model="checkbox"
                  dens
                  label="Eingeloggt bleiben"
                />
                <span class="text-caption grey--text text--darken-1 pointer">
                  passwort vergessen
                </span>
                <v-divider
                  v-if="errorlog"
                  class="my-2"
                />
                <span
                  :key="errorlog"
                  class="text-caption red--text text--darken-1 font-weight-bold"
                >
                  {{ errorlog }}
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  v-model="emailregis"
                  :rules="emailRules"
                  color="blue"
                  label="E-mail"
                  required
                  prepend-icon="mdi-account-circle"
                />

                <v-text-field
                  v-model="passwordregis"
                  required
                  color="blue"
                  label="Password"
                  :type="showPassword2 ? '' : 'password'"
                  :rules="passwordRules"
                  prepend-icon="mdi-lock"
                  :append-icon="!showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword2 = !showPassword2"
                />
                <v-text-field
                  v-model="passwordcheck"
                  color="blue"
                  label="Confirm Password"
                  :type="showPassword1 ? '' : 'password'"
                  required
                  :rules="[ pascheck ]"
                  prepend-icon="mdi-lock"
                  :append-icon="!showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword1 = !showPassword1"
                />
                <span class="text-caption grey--text text--darken-1">
                  Please enter a password for your account
                </span>
                <v-divider
                  v-if="error"
                  class="my-2"
                />
                <span class="text-caption red--text text--darken-1 font-weight-bold">
                  {{ error }}
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="~@/assets/fgblogo.png"
                />
                <h3 class="text-h6 font-weight-light mb-2">
                  Willkommen bei der <br> <em>fechtgesellschaft Basel</em>
                </h3>
                <span
                  class="text-caption grey--text"
                >
                  Danke für's Registrieren!
                </span>
              </div>
            </v-window-item>
          </v-window>

          <v-divider />

          <v-card-actions
            class="justify-center"
          >
            <v-container>
              <v-row class="pa-0">
                <v-col
                  class="pa-0 d-flex justify-center"
                >
                  <v-btn
                    v-if="step == 1"
                    color="primary"
                    depressed
                    @click.prevent="validate"
                  >
                    Login
                  </v-btn>
                  <v-btn
                    v-if="step == 2"
                    color="primary"
                    depressed
                    @click.prevent="validatereg"
                  >
                    Registrieren
                  </v-btn>
                </v-col>

                <v-col class="pa-0">
                  <v-spacer v-if="step != 1" />
                </v-col>

                <v-col
                  class="pa-0 d-flex justify-end"
                >
                  <v-btn
                    v-if="step == 1"
                    text
                    @click="step = 2"
                  >
                    Registrieren
                  </v-btn>
                  <v-btn
                    v-if="step == 2"
                    text
                    @click="step = 1"
                  >
                    Login
                  </v-btn>
                  <v-btn
                    v-if="step == 3"
                    color="success"
                    depressed
                    @click="weiter"
                  >
                    weiter
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
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
  import db from '../../Firebase/init'
  //  import { wait } from '../../util/helpers'
  // eslint-disable-next-line
  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })

  export default {
    name: 'DashboardView',
    components: {
    },

    data: () => ({
      valid: true,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length > 5 || 'Password muss mindestens 6 Zeichen haben',
        // (v) => /\d/.test(v) || 'Password muss mindestens eine Nummer enthalten',
        (v) => /[a-zß-öø-ÿ]/.test(v) || 'Password muss mindestens einen Kleinbuchstabe enthalten',
        (v) => /[A-ZÀ-ÖØ-Þ]/.test(v) || 'Password muss mindestens einen Grossbuchstabe enthalten',
        // (v) => /[!@#$%^&*)(+=._-]/.test(v) || 'Password muss mindestens ein Sonderzeichen enthalten',
      ],
      email: '',
      emailregis: '',
      password: '',
      passwordregis: '',
      passwordcheck: '',
      checkbox: false,
      showPassword: false,
      showPassword1: false,
      showPassword2: false,
      isEditing: true,
      error: '',
      errorlog: '',
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

    methods: {
      validate () {
        this.$refs.form.validate() ? this.log() : this.$refs.form.validate()
      },
      validatereg () {
        this.$refs.form.validate() ? this.reg() : this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      pascheck (value) {
        if (value !== this.passwordregis) {
          return 'Password muss übereinstimmen'
        } else {
          return true
        }
      },
      async weiter () {
        const path = '/start/confirmation/' + firebase.auth().currentUser.uid + '/'
        this.$router.push(path).catch(() => {})
      },
      async reg () {
        try {
          const firebaseAuth = await firebase.auth()
          const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.emailregis, this.passwordregis)
          const result = await createUser
          const dataBase = db.collection('users').doc(result.user.uid)
          await dataBase.set({
            privat: {
              fechten: false,
              firstName: '',
              nachName: '',
              gender: '',
              geburtsdatum: firebase.firestore.Timestamp.fromDate(new Date('January 1, 2000')),
              auto: false,
              funktionen: [],
            },
            login: {
              avatar: 'https://firebasestorage.googleapis.com/v0/b/fechtgesellschaft-1.appspot.com/o/profilbilder%2Fprofile-picture.jpg?alt=media&token=8abd74b4-8961-4cd5-9d7e-3bdc4533bd9c',
              gesperrt: false,
              admin: false,
              completed: false,
              email: this.emailregis,
              telefon: '',
              username: '',
            },
            kinder: [],
            addresse: {
              strasse: '',
              hausnummer: '',
              ort: '',
              postleitzahl: 0,
            },
          })
          console.log(result)
          this.step = 3
        } catch (error) {
          console.log(error)
          this.error = error.message
        }
      },
      log () {
        const session = firebase.auth.Auth.Persistence.SESSION
        const local = firebase.auth.Auth.Persistence.LOCAL
        firebase.auth().setPersistence(this.checkbox ? local : session)
          .then(() => {
            return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          })
          .then(() => {
            const cityRef = db.collection('users').doc(firebase.auth().currentUser.uid)
            return cityRef.get()
          })
          .then((doc) => {
            if (doc.data().login.completed) {
              this.$router.push('/').catch(() => {})
            } else {
              this.$router.push('/start/confirmation/' + firebase.auth().currentUser.uid + '/').catch(() => {})
            }
          })
          .catch((error) => {
            console.log(error)
            this.errorlog = error.message
          })
      },
    },
  }
</script>
