<template>
  <v-container
    id="alerts"
    fluid
    tag="section"
  >
    <view-intro
      heading="Fahrten"
      link="components/alerts"
      style="height: 200px"
    />
    <v-container>
      <v-row justify="center">
        <v-col
          class="text-center"
          align-self="center"
          cols="12"
          md="3"
        >
          <v-card
            class="mt-4 text-center"
            color="grey lighten-3"
            max-width="300px"
            height="525px"
          >
            <v-card-title>
              <v-text-field
                label="Search..."
                append-icon="mdi-magnify"
                color="green"
                hide-details
                solo
                flat
                rounded
                clearable
              />
            </v-card-title>
            <v-card-subtitle
              class="pt-5 pb-0"
            >
              <v-divider />
            </v-card-subtitle>
            <v-card-text
              class="py-0"
              color="transparent"
            >
              <v-card
                class="overflow-y-auto py-0 elevation-0"
                color="transparent"
                height="500px"
              >
                <v-list
                  :key="componentKey"
                  class="pt-1 mr-1"
                  color="transparent"
                  three-line
                >
                  <v-list-item-group
                    v-model="selectedItem"
                    mandatory
                    color="#7069E4"
                  >
                    <template
                      v-for="(item, index) in items"
                    >
                      <v-subheader
                        v-if="item.header"
                        :key="item.header"
                        v-text="item.header"
                      />

                      <v-divider
                        v-else-if="item.divider"
                        :key="index"
                        class="my-2"
                        :inset="item.inset"
                      />

                      <v-list-item
                        v-else
                        :key="item.title"
                        class="py-0"
                        selectable
                      >
                        <v-list-item-avatar>
                          <v-img :src="item.avatar" />
                        </v-list-item-avatar>

                        <v-list-item-content
                          class="pb-0"
                        >
                          <v-list-item-title
                            class="text-left font-weight-black text-subtitle-1"
                            v-html="item.title"
                          />
                          <v-list-item-subtitle
                            class="text-left pt-n1"
                            v-html="item.subtitle"
                          />
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          class="text-center"
          align-self="center"
          cols="12"
          md="5"
        >
          <v-card>
            <v-card-title>
              <v-list>
                <v-list-item
                  v-if="componentKey>0"
                >
                  <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-left font-weight-black text-subtitle-1 grey--text"
                      v-html="items[selectedItem].title"
                    />
                    <v-list-item-subtitle
                      class="text-left pt-n1"
                      v-html="items[selectedItem].tag"
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-title>
            <v-card-subtitle>
              <v-divider
                class="my-2"
              />
            </v-card-subtitle>
            <v-card-text>
              <v-list>
                <v-container
                  v-for="{ id, text, userPhotoURL, userName, userId } in messages"
                  :key="id"
                >
                  <v-list-item
                    v-if="userId === user.uid ? true : false"
                  >
                    <v-list-item-avatar>
                      <v-img :src="userPhotoURL" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="text-left font-weight-black text-subtitle-1 grey--text"
                        v-html="text"
                      />
                      <v-list-item-subtitle
                        class="text-left pt-n1"
                        v-html="userName"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-else
                  >
                    <v-list-item-avatar>
                      <v-img :src="userPhotoURL" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        class="text-left font-weight-black text-subtitle-1 blue--text"
                        v-html="text"
                      />
                      <v-list-item-subtitle
                        class="text-left pt-n1"
                        v-html="userName"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-container>
              </v-list>
              <div
                ref="bottom"
                class="mt-10"
              />
            </v-card-text>
            <v-card-actions>
              <v-form @submit.prevent="send">
                <v-row>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <v-text-field
                      v-model="message"
                    />
                  </v-col>
                  <v-col
                    md="4"
                  >
                    <v-btn type="submit">
                      Send
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import { ref, watch, nextTick } from '@vue/composition-api'
  import { useAuth, useChat, useUsers } from '../Firebase/init'

  export default {
    name: 'Fahrtenview',

    setup () {
      const { messages, sendMessage } = useChat()
      const bottom = ref(null)

      const componentKey = ref(0)

      const forceRender = () => {
        componentKey.value += 1
      }

      const { items } = useUsers()
      console.log(items.value)

      setTimeout(() => {
        console.log(items.value[0].title)
        forceRender()
      }, 1000)

      watch(
        messages,
        () => {
          nextTick(() => {
            bottom.value.scrollIntoView({ behavior: 'smooth' })
          })
        },
        items,
        () => {
          nextTick(() => {
            console.log(items.value.length)
          })
        },
      )
      const message = ref('')
      const send = () => {
        sendMessage(message.value)
        message.value = ''
      }

      const selectedItem = ref(1)

      const { user, isLogin, signOut, signIn } = useAuth()
      return { user, isLogin, signOut, signIn, bottom, messages, message, send, selectedItem, items, componentKey }
    },
  }
</script>

<style lang="sass">
  .pointer
    cursor: pointer
  .v-list--three-line .v-list-item, .v-list-item--three-line
    min-height: 70px
</style>
