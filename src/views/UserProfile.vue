<template>
  <v-container
    id="user-profile-view"
    fluid
    tag="section"
  >
    <v-container
      style="height: 290px"
    >
      <v-card
        color="transparent"
      >
        <v-card-title
          class="text-h2"
          style="color: white"
        >
          Hallo
        </v-card-title>
        <v-card-text
          style="color: white"
        >
          This is your Profile.
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="disabled ? disabled=false : updateProfile()"
            v-text="getTitle()"
          />
          <v-btn
            v-if="!disabled"
            @click="cancelupdateProfile"
            v-text="'cancel'"
          />
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            class="mt-4 text-center "
          >
            <v-img
              :src="
                require('@/assets/proil.svg')"
              class="pa-0"
            />
            <v-hover
              v-slot="{ hover }"
            >
              <v-card
                class="pa-0 text-center rounded-circle d-inline-block"
                style="margin-top: -100px"
                width="8vw"
              >
                <v-img
                  :class="['hoverimg', 'rounded-circle', 'elevation-10']"
                  :src="infos.login.avatar"
                  :aspect-ratio="1/1"
                  width="8vw"
                />
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    class="pa-0 text-center rounded-circle"
                    absolute
                    style="opacity: 0.8;"
                    color="black"
                    width="8vw"
                  >
                    <v-btn
                      class="text-h6 white--text"
                      color="transparent"
                      elevation="0"
                      @click="UploadUserImg"
                    >
                      edit
                    </v-btn>
                    <v-file-input
                      id="uploadUserImg"
                      v-model="files"
                      accept="image/*"
                      label="File input"
                      style="display: none;"
                      @change="uploadFile"
                    />
                  </v-overlay>
                </v-fade-transition>
                <v-snackbar
                  v-model="profilepicloading"
                  timeout="2000"
                >
                  Profilbild wird hochgeladen!

                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="blue"
                      text
                      v-bind="attrs"
                      @click="profilepicloading = false"
                    >
                      Close
                    </v-btn>
                  </template>
                </v-snackbar>
              </v-card>
            </v-hover>
            <v-card-text class="text-center">
              <h4 class="text-h4 mb-3 text--primary">
                {{ infos.privat.firstName }} {{ infos.privat.nachName }}
              </h4>

              <h6
                class="text-h6 mb-2 text--secondary"
              >
                <template
                  v-for="(items, index) in infos.privat.funktionen"
                >
                  {{ items }}
                  <span
                    v-if="(index+1) !== infos.privat.funktionen.length"
                    :key="index"
                  > | </span>
                </template>
              </h6>

              <p class="text--secondary">
                <br>
                {{ infos.addresse.strasse }} {{ infos.addresse.hausnummer }}
                <br>
                {{ infos.addresse.postleitzahl }} {{ infos.addresse.ort }}
              </p>
            </v-card-text>
          </v-card>
          <v-card
            id="card3"
            class="mt-4 text-center"
            :loading="vloading"
            min-height="100px"
          >
            <v-card-title>
              <strong>Verknüpte Konten -</strong>
              <v-icon
                color="black"
                v-text="'mdi-account-group'"
              />
              <v-spacer />
              <v-btn
                v-if="SelectedAccount !== -1"
                :disabled="!disabled"
                small
                class="mb-1 text-center white--text"
                color="red"
                @click="vKonntoback()"
              >
                Zurück
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              <v-divider />
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col
                  class="pa-0"
                >
                  <v-list
                    :key="idkey"
                  >
                    <template v-for="(chat, index) in userVerküpfteKonnten">
                      <v-list-item
                        :key="index"
                      >
                        <v-list-item-avatar>
                          <v-img
                            :alt="`${chat.login.avatar} avatar`"
                            :src="chat.login.avatar"
                          />
                        </v-list-item-avatar>

                        <v-list-item-content
                          class="pointer"
                          @click="vKonntoSelect(index)"
                        >
                          <v-list-item-title v-text="chat.privat.firstName + ' ' + chat.privat.nachName" />
                        </v-list-item-content>

                        <v-list-item-icon>
                          <v-icon
                            class="mx-2"
                            color="black"
                            v-text="icons[0]"
                          />
                          <v-icon
                            class="mx-2"
                            color="black"
                            @click="vKonntoBearbeiten(index)"
                            v-text="icons[1]"
                          />
                          <v-icon
                            class="mx-2"
                            color="black"
                            @click="vKonntoLöschen(index)"
                            v-text="icons[2]"
                          />
                        </v-list-item-icon>
                      </v-list-item>
                      <v-divider
                        :key="chat.privat.firstName"
                      />
                    </template>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <div
              v-if="userVerküpfteKonnten.length === 0"
              class="font-weight-black"
            >
              Keine Konten Verknüpft
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-row>
            <v-col>
              <v-card
                style="background: linear-gradient(to right, #11CBEF , #1273EF)"
              >
                <v-card-title
                  class="pb-0 white--text"
                >
                  ANZ. EVENTS BESUCHT
                  <v-spacer />
                  <v-avatar
                    size="40px"
                  >
                    <v-img
                      :src="
                        require('@/assets/events.svg')"
                    />
                  </v-avatar>
                </v-card-title>
                <v-card-text>
                  <v-row no-gutters>
                    <v-col
                      class="text-center"
                      cols="12"
                    >
                      <v-container class="text-h3 white--text">
                        <strong>{{ originalUserData.events.eventsBes }}</strong>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                style="background: linear-gradient(to right, #F5365B , #F46037)"
              >
                <v-card-title
                  class="pb-0 white--text"
                >
                  EINGELOGGT SEIT DEM
                  <v-spacer />
                  <v-avatar
                    size="40px"
                  >
                    <v-img
                      :src="
                        require('@/assets/check.svg')"
                    />
                  </v-avatar>
                </v-card-title>
                <v-card-text>
                  <v-row no-gutters>
                    <v-col
                      class="text-center"
                      cols="12"
                    >
                      <v-container class=" text-h3 white--text">
                        <strong>{{ registriertAm }}</strong>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <material-card
            class=" mt-8"
            color="primary"
            icon="mdi-account-outline"
          >
            <template #title>
              {{ getAccountTitle() }}
            </template>

            <v-form
              ref="profile"
              v-model="valid"
              lazy-validation
            >
              <v-container class="py-0">
                <v-row>
                  <v-col
                    class=" mt-5"
                    cols="12"
                  >
                    <h4>Userinformationen</h4>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-select
                      v-model="funktions"
                      :items="currentUserData.privat.funktionen"
                      chips
                      disabled
                      label="Funktionen"
                      multiple
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="currentUserData.login.username"
                      :disabled="disabled"
                      :rules="usernameRules"
                      color="purple"
                      label="User Name"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="currentUserData.login.email"
                      disabled
                      color="purple"
                      label="Email Address"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="currentUserData.privat.firstName"
                      :disabled="disabled"
                      :rules="nameRules"
                      color="purple"
                      label="First Name"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="currentUserData.privat.nachName"
                      :disabled="disabled"
                      :rules="nameRules"
                      color="purple"
                      label="Last Name"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="currentUserData.privat.gender"
                      :disabled="disabled"
                      :items="['männlich', 'weiblich']"
                      color="purple"
                      label="gender"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="geb"
                      disabled
                      color="purple"
                      label="Geburtstag"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-checkbox
                      v-model="currentUserData.privat.auto"
                      :disabled="disabled"
                      label="Ich besitze ein Auto"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-checkbox
                      v-model="currentUserData.privat.fechten"
                      :disabled="disabled"
                      label="Ich fechte persönlich"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-divider />
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <h4>Kontaktinormationen</h4>
                  </v-col>

                  <v-col
                    cols="12"
                    md="8"
                  >
                    <v-text-field
                      v-model="currentUserData.addresse.strasse"
                      :disabled="disabled"
                      :rules="streetRules"
                      color="purple"
                      label="Strasse"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="currentUserData.addresse.hausnummer"
                      :disabled="disabled"
                      :rules="nummerRules"
                      color="purple"
                      label="Hausnummer"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="currentUserData.addresse.ort"
                      :disabled="disabled"
                      :rules="ortRules"
                      color="purple"
                      label="ort"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="currentUserData.addresse.postleitzahl"
                      :disabled="disabled"
                      :rules="plzRules"
                      color="purple"
                      label="Postal Code"
                      type="number"
                      outlined
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    class="text-right"
                  >
                    <v-btn
                      color="primary"
                      min-width="150"
                      @click="disabled ? disabled=false : updateProfile()"
                    >
                      {{ getTitle() }}
                    </v-btn>
                    <v-btn
                      v-if="!disabled"
                      color="primary"
                      class="ml-3"
                      @click="cancelupdateProfile"
                      v-text="'cancel'"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-overlay
              v-if="loading"
              absolute
            >
              <v-progress-circular
                indeterminate
              />
            </v-overlay>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import { sync, get } from 'vuex-pathify'
  import MaterialCard from '../components/MaterialCard.vue'
  import 'firebase/auth'
  import db, { authService, useUsers } from '../Firebase/init'
  import firebase from 'firebase/app'
  const { getInfUser } = useUsers()

  export default {
    name: 'UserProfileView',
    components: { MaterialCard },
    data () {
      return {
        files: [],
        profilepicloading: false,
        vloading: false,
        loading: false,
        disabled: true,
        registriertAm: '',
        geb: '',
        userVerküpfteKonnten: [],
        idkey: 0,
        currentUserData: {},
        originalUserData: {},
        valid: true,
        SelectedAccount: -1,
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
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
        icons: ['mdi-account-cog', 'mdi-account-edit', 'mdi-account-minus'],
      }
    },

    computed: {
      ...sync('userfirebase', [
        'infos',
      ]),
      ...get('start', [
        'funktions',
      ]),
    },

    mounted () {
      // Object.assign(this.originalUserData, this.infos)
      // Object.assign(this.currentUserData, this.infos)
      this.update(this.originalUserData, this.infos)
      this.update(this.currentUserData, this.infos)
      // this.originalUserData = this.clone(this.infos)
      // this.currentUserData = this.clone(this.infos)
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      this.registriertAm = this.originalUserData.login.registriertAm.toDate().toLocaleDateString('de-DE', options)
      const options2 = { year: 'numeric', month: 'numeric', day: 'numeric' }
      this.geb = this.currentUserData.privat.geburtsdatum.toDate().toLocaleDateString('de-DE', options2)
      this.storeKonnten()
    },

    methods: {
      uploadFile () {
        console.log(this.files)
        if (this.files.length !== 0 && !(this.profilepicloading)) {
          this.profilepicloading = true
          console.log('this.files')
          if (this.SelectedAccount === -1) {
            firebase.storage().ref().child('profilbilder/' + authService.user.uid).put(this.files)
            const starsRef = firebase.storage().ref().child('profilbilder/' + authService.user.uid)

            // Get the download URL
            starsRef.getDownloadURL()
              .then((url) => {
                // Insert url into an <img> tag to "download"
                console.log(url)
                const dataBase = db.collection('users').doc(authService.user.uid)
                dataBase.set({
                  login: {
                    avatar: url,
                  },
                }, { merge: true })
                setTimeout(() => {
                  this.$store.commit({ type: 'userfirebase/updateAllData' })
                }, 1000)
              })
          } else {
            firebase.storage().ref().child('profilbilder/' + this.infos.kinder[this.SelectedAccount]).put(this.files)
            const starsRef = firebase.storage().ref().child('profilbilder/' + this.infos.kinder[this.SelectedAccount])

            // Get the download URL
            starsRef.getDownloadURL()
              .then((url) => {
                // Insert url into an <img> tag to "download"
                const dataBase = db.collection('users').doc(this.infos.kinder[this.SelectedAccount])
                dataBase.set({
                  login: {
                    avatar: url,
                  },
                }, { merge: true })
                setTimeout(() => {
                  this.$store.commit({ type: 'userfirebase/updateAllData' })
                }, 1000)
              })
          }
          this.files = []
        }
      },
      vKonntoback () {
        this.SelectedAccount = -1
        // Object.assign(this.currentUserData, this.infos)
        // Object.assign(this.originalUserData, this.infos)
        this.update(this.currentUserData, this.infos)
        this.update(this.originalUserData, this.infos)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        this.registriertAm = this.originalUserData.login.registriertAm.toDate().toLocaleDateString('de-DE', options)
        const options2 = { year: 'numeric', month: 'numeric', day: 'numeric' }
        this.geb = this.currentUserData.privat.geburtsdatum.toDate().toLocaleDateString('de-DE', options2)
      },
      vKonntoSelect (index) {
        this.SelectedAccount = index
        // Object.assign(this.currentUserData, this.userVerküpfteKonnten[index])
        // Object.assign(this.originalUserData, this.userVerküpfteKonnten[index])
        this.update(this.currentUserData, this.userVerküpfteKonnten[index])
        this.update(this.originalUserData, this.userVerküpfteKonnten[index])
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        this.registriertAm = this.originalUserData.login.registriertAm.toDate().toLocaleDateString('de-DE', options)
        const options2 = { year: 'numeric', month: 'numeric', day: 'numeric' }
        this.geb = this.currentUserData.privat.geburtsdatum.toDate().toLocaleDateString('de-DE', options2)
      },
      vKonntoBearbeiten (index) {
        this.vKonntoSelect(index)
        this.disabled = false
      },
      vKonntoEinstellen () {
        //
      },
      async vKonntoLöschen (index) {
        this.vloading = true
        const washingtonRef = db.collection('users').doc(authService.user.uid)
        console.log(this.infos.kinder[index])
        await washingtonRef.update({
          kinder: firebase.firestore.FieldValue.arrayRemove(this.infos.kinder[index]),
        })
        await this.$store.commit({ type: 'userfirebase/updateAllData' })
        setTimeout(() => {
          console.log(this.infos.kinder)
          this.storeKonnten()
          setTimeout(() => {
            this.vloading = false
            this.idkey++
          }, 500)
        }, 1000)
      },
      getAccountTitle () {
        if (this.SelectedAccount === -1) {
          return 'Your Profile'
        } else {
          return 'Profile von ' + this.userVerküpfteKonnten[this.SelectedAccount].privat.firstName + ' ' + this.userVerküpfteKonnten[this.SelectedAccount].privat.nachName
        }
      },
      async storeKonnten () {
        this.userVerküpfteKonnten = []
        for (let i = 0; i < this.infos.kinder.length; i++) {
          this.userVerküpfteKonnten[i] = await getInfUser(this.infos.kinder[i])
        }
        this.idkey++
      },
      updateProfile () {
        this.validate1()
        if (this.valid) {
          this.disabled = true
          this.loading = true
          setTimeout(() => {
            this.update(this.originalUserData, this.currentUserData)
            if (this.originalUserData.privat.fechten) {
              if (!(this.originalUserData.privat.funktionen.includes('fechter/in'))) this.originalUserData.privat.funktionen.push('fechter/in')
            } else {
              if (this.originalUserData.privat.funktionen.includes('fechter/in')) {
                console.log(this.originalUserData.privat.funktionen.indexOf('fechter/in'))
                this.originalUserData.privat.funktionen.splice(this.originalUserData.privat.funktionen.indexOf('fechter/in'), 1)
              }
            }
            if (this.SelectedAccount === -1) {
              // Object.assign(this.infos, this.originalUserData)
              this.update(this.infos, this.originalUserData)
              this.pushProfileData()
              this.loading = false
            } else {
              this.pushAccountData()
              this.loading = false
            }
            this.$store.commit({ type: 'userfirebase/updateAllData' })
          }, 2000)
        }
      },
      cancelupdateProfile () {
        if (this.SelectedAccount === -1) {
          this.disabled = true
          this.loading = true
          setTimeout(() => {
            this.update(this.currentUserData, this.infos)
            this.loading = false
          }, 2000)
        } else {
          this.vKonntoSelect(this.SelectedAccount)
        }
      },
      async pushProfileData () {
        try {
          const dataBase = db.collection('users').doc(authService.user.uid)
          await dataBase.set(this.infos, { merge: true })
        } catch (error) {
          console.log(error)
        }
      },
      async pushAccountData () {
        try {
          const dataBase = db.collection('users').doc(this.infos.kinder[this.SelectedAccount])
          await dataBase.set(this.originalUserData, { merge: true })
        } catch (error) {
          console.log(error)
        }
      },
      getTitle () {
        return this.disabled ? 'Edit Profile' : 'Update Profile'
      },
      validate1 () {
        this.$refs.profile.validate() ? console.log('form1 okay') : this.$refs.form1.validate()
      },
      update (obj) {
        for (var i = 1; i < arguments.length; i++) {
          for (var prop in arguments[i]) {
            var val = arguments[i][prop]
            // console.log(typeof val, prop, 'Object: ' + this.isObject(val), 'Array: ' + this.isArray(val), arguments[i][prop])
            if (typeof val === 'object') { // this also applies to arrays or null!
              if (this.isArray(val)) {
                if (typeof obj[prop] === 'undefined') {
                  obj[prop] = []
                }
              } else {
                if (typeof obj[prop] === 'undefined') {
                  obj[prop] = {}
                }
              }
              this.update(obj[prop], val)
            } else {
              obj[prop] = val
            }
          }
        }
        return obj
      },
      isObject (a) {
        return (!!a) && (a.constructor === Object)
      },
      isArray (a) {
        return (!!a) && (a.constructor === Array)
      },
      clone (obj) {
        if (obj === null || typeof obj !== 'object') return obj
        console.log(obj)
        var copy = obj.constructor()
        for (var attr in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = obj[attr]
        }
        return copy
      },
      UploadUserImg () {
        console.log('hey')
        const fileUpload = this.$el.querySelector('#uploadUserImg')
        if (fileUpload != null) {
          fileUpload.click()
        }
        console.log(fileUpload.files)
      },
    },
  }
</script>

<style lang="sass" scoped>
  .pointer
    cursor: pointer
</style>
