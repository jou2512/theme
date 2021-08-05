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
          <app-card class="mt-4 text-center">
            <v-img
              :src="
                require('@/assets/proil.svg')"
              class="pa-0"
            />
            <v-img
              class="rounded-circle d-inline-block"
              style="margin-top: -130px"
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
              width="200"
            />

            <v-card-text class="text-center">
              <h6 class="text-h6 mb-2 text--secondary">
                CEO / FOUNDER
              </h6>

              <h4 class="text-h4 mb-3 text--primary">
                John Leider
              </h4>

              <p class="text--secondary">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolorem deserunt veniam tempora magnam quisquam quam error iusto cupiditate ducimus, et eligendi saepe voluptatibus assumenda similique temporibus placeat animi dicta?
              </p>

              <v-btn
                class="mr-0"
                color="primary"
                min-width="100"
                rounded
              >
                Follow
              </v-btn>
            </v-card-text>
          </app-card>
        </v-col>
        <v-col
          cols="12"
          md="8"
        >
          <v-row>
            <v-col>
              <v-card
                style="background: linear-gradient(to right, #11CBEF , #1273EF)"
                class="white--text"
              >
                <v-card-title
                  class="pb-0"
                >
                  AN EVENTS TEILGENOMMEN
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
                <v-card-content>
                  <v-row no-gutters>
                    <v-col
                      cols="10"
                    >
                      <v-container class="d-flex justify-center text-h3">
                        <strong>3</strong>
                      </v-container>
                    </v-col>
                    <v-col>
                      <v-container class="d-flex justify-end pb-0">
                        <p>mal</p>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card-content>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                style="background: linear-gradient(to right, #F5365B , #F46037)"
                class="white--text"
              >
                <v-card-title
                  class="pb-0"
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
                <v-card-content>
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                    >
                      <v-container class="d-flex justify-center text-h3">
                        <strong>25.12.20</strong>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card-content>
              </v-card>
            </v-col>
          </v-row>
          <material-card
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
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      disabled
                      label="Company (disabled)"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      color="purple"
                      label="User Name"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      color="purple"
                      label="Email Address"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      color="purple"
                      label="First Name"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      color="purple"
                      label="Last Name"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      color="purple"
                      label="Adress"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      color="purple"
                      label="City"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      color="purple"
                      label="Country"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      color="purple"
                      label="Postal Code"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      color="purple"
                      label="About Me"
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
  export default {
    name: 'UserProfileView',
    components: { MaterialCard },
  }
</script>
