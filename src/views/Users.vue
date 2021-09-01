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
      :headers="headers"
      :items="mitglieder"
      :search="search"
      :loading="loading"
      :key="forceupdate"
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
          ></v-divider>
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
          <v-spacer></v-spacer>
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
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="Emailaddresse"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.subtitle"
                        label="Alter"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.tag"
                        label="Categorie"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
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
              <v-card-title class="text-h5">Are you sure you want to delete this User?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                >Cancel</v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                >OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
        >
          mdi-message-text
        </v-icon>
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="deleteItem(item)"
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
              >Account Blockieren</v-list-item-title>
              <v-list-item-title
                v-else
              >Account Entblockieren</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="addAdminRole(item, !item.adim)"
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
              >Zum Admin machen</v-list-item-title>
              <v-list-item-title
                v-else
              >Admin Rolle Entfernen</v-list-item-title>
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
  </v-container>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/functions'
  import { get } from 'vuex-pathify'
  import db, { useUsers } from '../Firebase/init'

  const { users } = useUsers()

  export default {
    name: 'RegularTablesView',

    data () {
      return {
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

    methods: {
      addAdminRole (item, disable) {
        this.loading = true
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole')
        addAdminRole({ uid: item.uid, disable: disable }).then(result => {
          console.log(result)
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
          this.loading = false
          this.forceupdate++
        }, 2000)
      },

      editItem (item) {
        this.editedIndex = this.mitglieder.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        db.collection('users').doc(item.uid).delete()
        this.$store.commit({ type: 'userfirebase/updateAllData' })
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.mitglieder.splice(this.editedIndex, 1)
        this.closeDelete()
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
    },
  }
</script>
