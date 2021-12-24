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
      <v-row>
        <v-col
          cols="12"
          sm="3"
          class="pb-2 pr-2"
        >
          <v-card
            :key="key"
          >
            <v-app-bar
              flat
              color="rgba(0,0,0,0)"
            >
              <v-toolbar-title
                class="text-h6"
              >
                Chat
              </v-toolbar-title>

              <v-spacer />
              <v-btn
                icon
              >
                <v-icon>
                  mdi-dots-horizontal
                </v-icon>
              </v-btn>
            </v-app-bar>
            <v-app-bar
              flat
              color="rgba(0,0,0,0)"
            >
              <v-autocomplete
                v-model="model"
                :search-input.sync="selectedChat"
                :items="mitgliederkeineKinder"
                auto-select-first
                append-icon="mdi-magnify"
                filled
                color="blue-grey lighten-2"
                label="Search for Conversation/People"
                item-text="title"
                item-value="title"
                return-object
                @change="v => {selectChat(v), show(v)}"
              >
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.title" />
                      <v-list-item-subtitle>
                        {{ data.item.funktionen.toString() }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-app-bar>

            <v-divider />

            <v-list
              two-line
              color="rgba(0,0,0,0)"
              class="overflow-y-auto"
              max-height="500"
            >
              <v-list-item-group
                v-if="chats"
                v-model="selected"
                mandatory
                active-class="blue lighten-4"
                @change="changeChat()"
              >
                <template
                  v-for="(item, index) in chats"
                >
                  <v-list-item
                    :key="item.title"
                  >
                    <v-badge
                      bordered
                      bottom
                      color="transparent"
                      dot
                      offset-x="22"
                      offset-y="26"
                    >
                      <v-list-item-avatar>
                        <v-img
                          :src="getAvatar(item)"
                        />
                      </v-list-item-avatar>
                    </v-badge>
                    <template>
                      <v-list-item-content>
                        <v-list-item-title
                          v-if="item.type === 'chat'"
                          v-text="getTitle(item)"
                        />
                        <v-list-item-title
                          v-else
                          v-text="item.title"
                        />

                        <v-list-item-subtitle
                          v-text="item.lastMessage === null ? '' : 'Last Message ' + convertTime(item.lastMessage) + ' ago'"
                        />
                      </v-list-item-content>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < mitgliederkeineKinder.length - 1"
                    :key="index"
                  />
                </template>
              </v-list-item-group>
              <template
                v-else
              >
                <h3 class="text-center red--text font-weight-thin py-5">
                  Du hast momentan noch keine Chats
                </h3>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          v-if="chats"
          cols="12"
          sm="6"
          class="pb-2 pr-2"
        >
          <v-card
            class="pt-2"
          >
            <v-app-bar
              color="rgba(0,0,0,0)"
              flat
            >
              <v-badge
                bordered
                bottom
                color="transparent"
                dot
                offset-x="11"
                offset-y="13"
              >
                <v-avatar
                  class="mt-n7"
                  size="40"
                  elevation="10"
                >
                  <img
                    :src="getAvatar(chats[selected])"
                  >
                </v-avatar>
              </v-badge>
              <v-toolbar-title
                class="text-h6 pl-0 ml-2 mt-n4"
              >
                {{ getTitle(chats[selected]) }}
              </v-toolbar-title>
              <v-spacer />
              <v-toolbar-title
                v-if="chats[selected].type === 'chat' ? false : true"
                class="text-h6 pl-0 mr-2 mt-n4"
              >
                Members
                :
              </v-toolbar-title>
              <template
                v-if="chats[selected].type === 'chat' ? false : true"
              >
                <v-btn
                  color="blue"
                  icon
                  class="mt-n5 mr-n2"
                  outlined
                  max-height="35"
                  max-width="35"
                >
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>
                <v-avatar
                  class="mt-n5 mr-2"
                  size="30"
                  elevation="10"
                >
                  <img
                    src="https://cdn.vuetifyjs.com/images/lists/5.jpg"
                  >
                </v-avatar>
                <v-divider
                  vertical
                  inset
                  class="mt-n1"
                />
                <v-btn
                  color="black"
                  icon
                  class="mt-n5"
                >
                  <v-icon>
                    mdi-cog
                  </v-icon>
                </v-btn>
              </template>
            </v-app-bar>

            <v-divider />

            <v-card
              class="overflow-y-auto"
              color="transparent"
              flat
              height="500"
            >
              <v-container
                v-for="({ id, text, userId }, index) in messages"
                :key="id"
              >
                <v-app-bar
                  v-if="userId === user.uid"
                  color="rgba(0,0,0,0)"
                  flat
                  class="mb-16"
                >
                  <v-spacer />
                  <v-btn
                    color="black"
                    icon
                    class="mb-n10"
                  >
                    <v-icon
                      small
                    >
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                  <v-card
                    class="mt-10 mr-2"
                    max-width="350px"
                    color="blue"
                    dark
                  >
                    <v-list-item
                      three-line
                    >
                      <v-list-item-content>
                        <div
                          class=" mb-4"
                        >
                          {{ text }}
                        </div>
                        <v-list-item-subtitle>
                          {{ convertTime(messages[index].createdAt) }}
                          ago
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-badge
                    bordered
                    bottom
                    color="green"
                    dot
                    offset-x="10"
                    offset-y="10"
                  >
                    <v-avatar
                      class="mt-n5 "
                      size="30"
                      elevation="10"
                    >
                      <img
                        :src="avatar"
                      >
                    </v-avatar>
                  </v-badge>
                </v-app-bar>
                <v-app-bar
                  v-else
                  color="rgba(0,0,0,0)"
                  flat
                  class="mb-16"
                >
                  <v-badge
                    bordered
                    bottom
                    color="transparent"
                    dot
                    offset-x="16"
                    offset-y="9"
                  >
                    <v-avatar
                      class="mt-n5 mr-2"
                      size="30"
                      elevation="10"
                    >
                      <img
                        :src="getAvatar(chats[selected])"
                      >
                    </v-avatar>
                  </v-badge>
                  <v-card
                    class="mt-10 "
                    max-width="350px"
                  >
                    <v-list-item
                      three-line
                    >
                      <v-list-item-content>
                        <div
                          class=" mb-4"
                        >
                          {{ text }}
                        </div>
                        <v-list-item-subtitle>
                          {{ convertTime(messages[index].createdAt) }}
                          ago
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-btn
                    color="black"
                    icon
                    class="mb-n10"
                  >
                    <v-icon
                      small
                    >
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                </v-app-bar>
              </v-container>
              <div
                ref="bottom"
                class="mt-10"
              />
            </v-card>
            <v-card
              class=""
              height="120"
            >
              <form
                v-if="isLogin"
                id="mes"
                @submit.prevent="send"
              >
                <v-app-bar
                  color="rgba(0,0,0,0)"
                  flat
                  style="height = 120px important!;"
                >
                  <v-textarea
                    v-model="message"
                    append-icon="mdi-emoticon"
                    filled
                    clear-icon="mdi-close-circle"
                    clearable
                    label="Message"
                    type="text"
                    rows="3"
                    :counter-value="countervalue"
                    @click:clear="clearMessage"
                    hide-details
                  >
                    <template v-slot:append-outer>
                      <v-btn
                        icon
                        class="grey--text"
                        type="submit"
                      >
                        <v-icon>
                          mdi-send
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
                </v-app-bar>
              </form>
            </v-card>
          </v-card>
        </v-col>
        <v-col
          v-if="chats"
          cols="12"
          sm="3"
        >
          <v-card
            class="pb-3"
          >
            <v-card
              class="text-center mt-8 mb-3"
              shaped
            >
              <v-badge
                bordered
                bottom
                color="transparent"
                dot
                offset-x="11"
                offset-y="13"
              >
                <v-avatar
                  class="mt-n7"
                  size="60"
                  elevation="10"
                >
                  <img
                    :src="getAvatar(chats[selected])"
                  >
                </v-avatar>
              </v-badge>
              <v-card-title
                class="layout justify-center"
              >
                {{ getTitle(chats[selected]) }}
              </v-card-title>
              <v-card-subtitle
                class="layout justify-center"
              >
                {{ getFunktionen(chats[selected]).toString() }}
              </v-card-subtitle>
              <v-list />
            </v-card>
            <v-expansion-panels
              v-model="panel"
              class="px-3"
              multiple
            >
              <v-expansion-panel
                v-if="chats[selected].type === 'groupe' ? true : false"
              >
                <v-expansion-panel-header>
                  <h3>
                    Details
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card>
                    Hey Ich wollte Vorschlagen sich um etwa 6:30 bei der Fechtgesellschaft zu treffen.
                    Ich würde die Kinder hinfahren und dann in der Stadt noch ein wenig Shoppen gehen, während die Trainer auf sie Aufpassen.
                    Und sie Danach wieder nach hause fahren, ich werde euch dann hier Bescheid geben wenn wir alle fertig sind.
                    Währe dies für alle in Ordnung?
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
                v-if="chats[selected].type === 'groupe' ? true : false"
              >
                <v-expansion-panel-header>
                  <h3>
                    Turnier Ausschreibung
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="text-center">
                    <v-dialog
                      v-model="dialog"
                      height="50vh"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="red lighten-2"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          Open Dcument
                        </v-btn>
                      </template>
                      <v-btn
                        color="red lighten-2"
                        dark
                        max-width="100"
                        right
                        @click="dialog=false"
                      >
                        close
                      </v-btn>
                      <embed
                        src="https://firebasestorage.googleapis.com/v0/b/fechtgesellschaft-1.appspot.com/o/Fragebogen%20PISTE-Test_DE3.pdf?alt=media&token=4edfa7b1-66d4-4a3e-95e8-39343bfb3f21#view=FitH"
                      >
                    </v-dialog>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel
                v-if="chats[selected].type === 'groupe' ? true : false"
              >
                <v-expansion-panel-header>
                  <h3>
                    Turnier Startzeiten
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <template
                    v-for="i in infosTurnier.days.length"
                  >
                    <v-subheader
                      :key="infosTurnier.days[i-1]"
                    >
                      {{ infosTurnier.days[i-1] }}
                    </v-subheader>
                    <v-simple-table
                      :key="i"
                      dense
                    >
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              Kategorie
                            </th>
                            <th class="text-left">
                              Scratch
                            </th>
                            <th class="text-left">
                              Start
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in filterddays(i-1)"
                            :key="index"
                          >
                            <td>{{ item.cat }}</td>
                            <td>{{ item.scr }}</td>
                            <td>{{ item.start }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel v-if="false">
                <v-expansion-panel-header>
                  <h3>
                    Images(14)
                  </h3>
                </v-expansion-panel-header>
              </v-expansion-panel>
              <v-expansion-panel v-if="false">
                <v-expansion-panel-header>
                  <h3>
                    Files(3)
                  </h3>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list
                    shaped
                  >
                    <v-list-item-group>
                      <v-list-item
                        v-for="(item, i) in files"
                        :key="i"
                      >
                        <v-list-item-icon>
                          <v-icon
                            color="green"
                            v-text="item.icon"
                          />
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.text"
                          />
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel v-if="false">
                <v-expansion-panel-header>
                  <h3>
                    Pinned
                    items
                  </h3>
                </v-expansion-panel-header>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
  import firebase from 'firebase/app'
  import { ref, watch, nextTick } from '@vue/composition-api'
  import { useAuth, useChat, useUsers, authService } from '../Firebase/init'
  import { get } from 'vuex-pathify'
  export default {
    setup () {
      const { items } = useUsers()
      const { chats, messages, sendMessage, chattype, assignChat, searchChats } = useChat()
      const bottom = ref(null)
      const selectedChat = ref('')
      const model = ref('')
      const selected = ref(0)
      watch(
        messages,
        () => {
          nextTick(() => {
            bottom.value.scrollIntoView({ behavior: 'auto' })
          })
        },
        chats,
        () => {
          nextTick(() => {
            console.log('okay')
          })
        },
        selected,
        (v, n) => {
          nextTick(() => {
            console.log(v, n)
            assignChat(chats.value[selected.value].id)
          })
        },
      )
      const message = ref('')
      const send = () => {
        sendMessage(message.value)
        message.value = ''
      }

      const submitmessage = () => {
        document.getElementById('mes').submit()
      }

      const changeChat = () => {
        assignChat(chats.value[selected.value].id)
      }

      const selectChat = (v) => {
        const i = searchChats(v)
        console.log(i)
        selected.value = i
        changeChat()
        nextTick(() => {
          selectedChat.value = ''
          model.value = null
          console.log('chatss', chats.value)
        })
      }

      const convertTime = createdAt => {
        var startTime = createdAt
        var endTime = firebase.firestore.Timestamp.fromDate(new Date())
        var differenceInSeconds = endTime - startTime

        var hours = Math.floor(differenceInSeconds / 3600)
        var days = Math.floor(hours / 24)
        var minutes = Math.floor((differenceInSeconds % 3600) / 60)
        var seconds = Math.round((differenceInSeconds % 3600) % 60) + 1
        if (days > 0) {
          return days + ' days'
        } else if (hours > 0) {
          return hours + ' hours'
        } else if (minutes > 0) {
          return minutes + ' minutes'
        } else {
          return seconds + ' seconds'
        }
      }
      console.log(chats.value)
      const { user, isLogin, signOut, signIn } = useAuth()
      return { model, changeChat, selectChat, user, convertTime, chattype, isLogin, signOut, signIn, bottom, messages, message, chats, send, selected, items, submitmessage, selectedChat }
    },
    data: () => ({
      dialog: false,
      overlay: false,
      key: 0,
      infosTurnier: {
        days: ['saturday', 'sunnday'],
        zeiten: [
          {
            day: 'saturday',
            cat: 'H U14',
            scr: '8:00',
            start: '8:30',
          },
          {
            day: 'sunnday',
            cat: 'H U17',
            scr: '7:30',
            start: '8:00',
          },
          {
            day: 'saturday',
            cat: 'D U17',
            scr: '7:30',
            start: '8:00',
          },
          {
            day: 'sunnday',
            cat: 'D U14',
            scr: '8:00',
            start: '8:30',
          },
        ],
      },
      files: [
        {
          text: 'Landing_page.zip',
          icon: ' mdi-cloud-upload',
        },
        {
          text: 'Requirements.pdf',
          icon: ' mdi-cloud-upload',
        },
        {
          text: 'Uwagi.docx',
          icon: ' mdi-cloud-upload',
        },
      ],
      panel: [],
      iconIndex: 0,
    }),
    computed: {
      theme () {
        return this
          .$vuetify
          .theme
          .dark
          ? 'dark'
          : 'light'
      },
      ...get('userfirebase', [
        'mitgliederkeineKinder',
        'infos@login@avatar',
      ]),
    },
    mounted () {
      setTimeout(() => {
        console.log('chats new', this.chats)
        this.key++
      }, 1000)
    },
    methods: {
      countervalue (v) {
        //
      },
      getFunktionen (selected) {
        const userIndex = selected.users.indexOf(authService.user.uid)
        const uid = selected.users[1 - userIndex]
        const inf = this.mitgliederkeineKinder.find(mitglied => mitglied.uid === uid)
        return inf.funktionen
      },
      getTitle (selected) {
        const userIndex = selected.users.indexOf(authService.user.uid)
        const uid = selected.users[1 - userIndex]
        const inf = this.mitgliederkeineKinder.find(mitglied => mitglied.uid === uid)
        return inf.title
      },
      getAvatar (selected) {
        const userIndex = selected.users.indexOf(authService.user.uid)
        const uid = selected.users[1 - userIndex]
        const inf = this.mitgliederkeineKinder.find(mitglied => mitglied.uid === uid)
        return inf.avatar
      },
      sendMessage () {
        this.resetIcon()
        this.clearMessage()
      },
      clearMessage () {
        this.message =
          ''
      },
      resetIcon () {
        this.iconIndex = 0
      },
      filterddays (day) {
        return this.infosTurnier.zeiten.filter(v => v.day === this.infosTurnier.days[day])
      },
      show (v) {
        console.log(v)
      },
    },
  }
</script>
<style>
  .v-dialog {
    height: 100% !important;
  }
  .v-dialog > * {
    width: 100% !important;
    height: 100%;
  }
</style>
