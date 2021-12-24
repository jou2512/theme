<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <view-intro
      heading="Simple Tables"
      link="components/simple-tables"
      style="height: 200px"
    />
    <v-data-table
      :key="forceupdate"
      :headers="headers"
      :items="mitglieder"
      :search="search"
      :loading="loading"
      show-group-by
      class="elevation-1 rounded-lg"
    >
      <template v-slot:item.title="{ item }">
        <v-list-item>
          <v-list-item-avatar
            v-if="item.avatar"
          >
            <v-img :src="item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon
            v-if="item.admin && !item.gesperrt"
          >
            <v-chip>
              <v-icon>
                mdi-star
              </v-icon>
              Admin
            </v-chip>
          </v-list-item-icon>
          <v-list-item-icon
            v-if="item.gesperrt"
          >
            <v-chip>
              <v-icon>
                mdi-account-cancel
              </v-icon>
              Gesperrt
            </v-chip>
          </v-list-item-icon>
        </v-list-item>
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
          class="rounded-lg"
        >
          <v-toolbar-title>User</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-btn
            icon
            small
          >
            <v-icon
              color="black"
              @click="update()"
            >
              mdi-refresh
            </v-icon>
          </v-btn>
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                disabled
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.title"
                        label="Name"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="Emailaddresse"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.subtitle"
                        label="Alter"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.tag"
                        label="Categorie"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this User?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteUserConfirm"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
      <template v-slot:item.funktionen="{ item }">
        <v-edit-dialog
          :return-value.sync="item.funktionen"
          persistent
          large
          @save="saveUser(item)"
        >
          <template
            v-for="(func, index) in item.funktionen"
          >
            {{ func }}
            <span
              v-if="(index+1) !== item.funktionen.length"
              :key="index"
            > | </span>
          </template>
          <template v-slot:input>
            <v-select
              v-model="item.funktionen"
              small-chips
              clearable
              deletable-chips
              multiple
              :items="funktions"
              label="funktionen"
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          v-if="false"
          small
          class="mr-2"
        >
          mdi-message-text
        </v-icon>
        <v-icon
          v-if="false"
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="deleteUser(item)"
        >
          mdi-delete
        </v-icon>
        <v-menu
          top
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-dots-horizontal
            </v-icon>
          </template>

          <v-list
            dense
          >
            <v-list-item
              @click="deactivateUser(item, !item.gesperrt)"
            >
              <v-list-item-avatar
                style="height: inherit;"
              >
                <v-icon
                  v-if="!item.gesperrt"
                >
                  mdi-account-cancel
                </v-icon>
                <v-icon
                  v-else
                >
                  mdi-account-check
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title
                v-if="!item.gesperrt"
              >
                Account Blockieren
              </v-list-item-title>
              <v-list-item-title
                v-else
              >
                Account Entblockieren
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="addAdminRole(item, !item.admin)"
            >
              <v-list-item-avatar
                style="height: inherit;"
              >
                <v-icon
                  v-if="!item.admin"
                >
                  mdi-account-star
                </v-icon>
                <v-icon
                  v-else
                >
                  mdi-account-remove
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-title
                v-if="!item.admin"
              >
                Zum Admin machen
              </v-list-item-title>
              <v-list-item-title
                v-else
              >
                Admin Rolle Entfernen
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <sweet-modal
      ref="modal"
      icon="success"
      :blocking="true"
      :pulse-on-block="false"
      :hide-close-button="true"
    >
      User {{ UserMessage }} successfully!
    </sweet-modal>
  </v-container>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/functions'
  import { get } from 'vuex-pathify'
  import db from '../Firebase/init'
  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

  export default {
    name: 'RegularTablesView',

    data () {
      return {
        UserMessage: '',
        forceupdate: 0,
        loading: false,
        search: '',
        dialog: false,
        dialogDelete: false,
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'ID',
          },
          { text: 'Name', value: 'title' },
          { text: 'Alter', value: 'alter' },
          { text: 'Categorie', value: 'categorie' },
          { text: 'Role', value: 'funktionen' },
          { text: 'Aktionen', value: 'actions', sortable: false, groupable: false },
        ],
        editedIndex: -1,
        editedItem: {
          ID: '',
          title: '',
          subtitle: '',
          email: '',
          tag: '',
        },
        defaultItem: {
          ID: '',
          title: '',
          subtitle: '',
          email: '',
          tag: '',
        },
      }
    },

    components: {
      SweetModal,
      SweetModalTab,
    },

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
        'mitglieder',
      ]),
      ...get('start', [
        'funktions',
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      users (val) {
        console.log(val)
      },
    },

    mounted () {
      console.log(this.mitglieder)
    },

    methods: {
      addAdminRole (item, disable) {
        this.loading = true
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole')
        addAdminRole({ uid: item.uid, disable: disable }).then(result => {
          console.log(result)
          if (disable) {
            this.UserMessage = 'promoted to Admin'
          } else {
            this.UserMessage = 'degradated'
          }
          this.$refs.modal.open()
          setTimeout(() => {
            this.update()
          }, 2000)
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
      },
      deactivateUser (item, disable) {
        this.loading = true
        const deactivateUser = firebase.functions().httpsCallable('deactivateUser')
        deactivateUser({ uid: item.uid, disable: disable }).then(result => {
          console.log(result)
          if (disable) {
            this.UserMessage = 'deactivated'
          } else {
            this.UserMessage = 'reactivated'
          }
          this.$refs.modal.open()
          setTimeout(() => {
            this.update()
          }, 2000)
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
      },
      update () {
        this.loading = true
        this.$store.commit({ type: 'userfirebase/updateAllData' })
        setTimeout(() => {
          this.$refs.modal.close()
          this.loading = false
          this.forceupdate++
        }, 2000)
      },

      editItem (item) {
        this.editedIndex = this.mitglieder.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteUser (item) {
        this.dialogDelete = true
        this.editedItem = Object.assign({}, item)
      },

      deleteUserConfirm () {
        this.loading = true
        if (this.editedItem.uid.length > 20) {
          this.dialogDelete = false
          const deleteUser = firebase.functions().httpsCallable('deleteUser')
          db.collection('users').doc(this.editedItem.uid).delete()
          console.log(this.editedItem.uid)
          deleteUser({ uid: this.editedItem.uid }).then(result => {
            console.log(result)
            this.closeDelete()
            this.UserMessage = 'deleted'
            this.$refs.modal.open()
            setTimeout(() => {
              this.update()
            }, 2000)
          }).catch((error) => {
            console.log(error)
            this.loading = false
          })
        } else {
          db.collection('users').doc(this.editedItem.uid).delete()
          this.closeDelete()
          this.UserMessage = 'deleted'
          this.$refs.modal.open()
          setTimeout(() => {
            this.update()
          }, 2000)
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.mitglieder[this.editedIndex], this.editedItem)
        } else {
          this.mitglieder.push(this.editedItem)
        }
        this.close()
      },

      async saveUser (user) {
        this.loading = true
        const washingtonRef = db.collection('users').doc(user.uid)
        var fechtenloc = false
        if (user.funktionen.includes('fechter/in')) {
          fechtenloc = true
        }
        console.log(user)
        this.UserMessage = 'modified Role/s'
        this.$refs.modal.open()
        await washingtonRef.set({
          privat: {
            funktionen: user.funktionen,
            fechten: fechtenloc,
          },
        }, { merge: true })
        await this.update()
      },
    },
  }
</script>
