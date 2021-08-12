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
          <v-btn>
            Edit your profile
          </v-btn>
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
                    <template v-for="chat in recent">
                      <v-list-item
                        :key="chat.title"
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
                        <strong>3</strong>
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
                        <strong>25.12.20</strong>
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

            <v-form>
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
                      v-model="user.funktion"
                      disabled
                      label="FUNKTION"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="user.username"
                      disabled
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
                      v-model="user.email"
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
                      v-model="user.vorname"
                      disabled
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
                      v-model="user.name"
                      disabled
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
                      v-model="user.gender"
                      disabled
                      :items="['male', 'female']"
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
                      v-model="user.date"
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
                      v-model="user.auto"
                      disabled
                      label="Ich besitze ein Auto"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-checkbox
                      v-model="user.fechten"
                      disabled
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
                      v-model="user.strasse"
                      disabled
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
                      v-model="user.nummer"
                      disabled
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
                      v-model="user.ort"
                      disabled
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
                      v-model="user.postleitzahl"
                      disabled
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
                    >
                      Update Profile
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
  import MaterialCard from '../components/MaterialCard.vue'
  import $ from 'jquery'

  export default {
    name: 'UserProfileView',
    components: { MaterialCard },
    data () {
      return {
        user: {
          funktion: 'funktion',
          username: 'joe5959',
          email: 'joel.scheuner5icloud.com',
          vorname: 'joel',
          name: 'scheuner',
          gender: 'male',
          date: '09.09.00',
          auto: true,
          fechten: true,
          strasse: 'im lee',
          nummer: 39,
          ort: 'Arlesheim',
          postleitzahl: 4444,
        },
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
    mounted () {
      var height = $('#card3').width()
      console.log(height * 0.3)
      var height3 = $('#pic').width(height * 0.3)
      console.log(height3)
    },
  }
</script>

<style lang="sass" scoped>

</style>
