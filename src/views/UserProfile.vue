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
            id="card3"
            class="mt-4 text-center"
          >
            <v-img
              :src="
                require('@/assets/proil.svg')"
              class="pa-0"
            />
            <v-img
              id="pic"
              class="rounded-circle d-inline-block"
              style="margin-top: -130px"
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            />

            <v-card-text class="text-center">
              <h4 class="text-h4 mb-3 text--primary">
                Name
              </h4>

              <h6 class="text-h6 mb-2 text--secondary">
                Funktion
              </h6>

              <p class="text--secondary">
                <br>
                Addresse
              </p>
            </v-card-text>
          </v-card>
          <v-card
            class="mt-4 text-center"
          >
            <v-card-title>
              <strong>Verknüpte Konnten -</strong>
              <v-icon
                color="black"
                v-text="icon"
              />
            </v-card-title>
            <v-card-subtitle>
              <v-divider />
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col
                  class="pa-0"
                >
                  <v-list>
                    <template v-for="(chat, index) in recent">
                      <v-list-item
                        :key="index"
                      >
                        <v-list-item-avatar>
                          <v-img
                            :alt="`${chat.title} avatar`"
                            :src="chat.avatar"
                          />
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title v-text="chat.title" />
                        </v-list-item-content>

                        <v-list-item-icon>
                          <v-icon
                            color="black"
                            v-text="icons[0]"
                          />
                          <v-icon
                            color="black"
                            v-text="icons[1]"
                          />
                          <v-icon
                            color="black"
                            v-text="icons[2]"
                          />
                        </v-list-item-icon>
                      </v-list-item>
                      <v-divider
                        :key="chat.title"
                      />
                    </template>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="info"
              >
                Konto <br> hinzufügen
                <v-icon
                  color="white"
                  v-text="'mdi-account-plus'"
                />
              </v-btn>
            </v-card-actions>
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
                        <strong>{{ infos.events.eventsBes }}</strong>
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
              Edit Profile — <small class="text-body-1">Complete your profile</small>
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
                    <h4>Userinormationen</h4>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      disabled
                      label="FUNKTION"
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
                      :disabled="disabled"
                      :rules="emailRules"
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
                      :disabled="disabled"
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
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'
  import MaterialCard from '../components/MaterialCard.vue'
  import $ from 'jquery'

  export default {
    name: 'UserProfileView',
    components: { MaterialCard },
    data () {
      return {
        disabled: true,
        registriertAm: '',
        geb: '',
        user: {},
        currentUserData: {},
        originalUserData: {},
        valid: true,
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
        icon: 'mdi-account-group',
        icons: ['mdi-account-cog', 'mdi-account-edit', 'mdi-account-minus'],
        recent: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Jason Oner',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Mike Carlson',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Cindy Baker',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Ali Connors',
          },
        ],
      }
    },

    computed: {
      ...get('userfirebase', [
        'infos',
      ]),
    },

    mounted () {
      var height = $('#card3').width()
      console.log(height * 0.3)
      var height3 = $('#pic').width(height * 0.3)
      console.log(height3)
      this.originalUserData = this.currentUserData = this.infos
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      this.registriertAm = this.originalUserData.login.registriertAm.toDate().toLocaleDateString('de-DE', options)
      const options2 = { year: 'numeric', month: 'numeric', day: 'numeric' }
      this.geb = this.currentUserData.privat.geburtsdatum.toDate().toLocaleDateString('de-DE', options2)
    },

    methods: {
      updateProfile () {
        console.log(this.currentUserData)
        this.validate1()
        if (this.valid) {
          this.disabled = true
          // this.update(this.originalUserData, this.currentUserData)
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
            if (typeof val === 'object') { // this also applies to arrays or null!
              if (typeof obj[prop] === 'undefined') {
                obj[prop] = {}
              }
              this.update(obj[prop], val)
            } else {
              obj[prop] = val
            }
          }
        }
        console.log(obj)
        return obj
      },
    },
  }
</script>

<style lang="sass" scoped>

</style>
