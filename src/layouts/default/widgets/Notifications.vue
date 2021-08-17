<template>
  <v-menu
    bottom
    left
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        v-bind="attrs"
        v-on="on"
        :disabled="notificationsLength===0"
      >
        <v-badge
          v-if="notificationsLength>0"
          bordered
          color="red"
          overlap
        >
          <template
            v-slot:badge
          >
            <span>{{ notificationsLength }}</span>
          </template>

          <v-icon>mdi-bell</v-icon>
        </v-badge>

        <v-icon
          v-else
        >
          mdi-bell
        </v-icon>
      </v-btn>
    </template>

    <v-list
      flat
      nav
    >
      <app-bar-item
        v-for="(n, i) in notifications"
        :key="i"
        link
      >
        <template>
          <v-list-item-icon>
            <v-icon>
              {{ icons[n.type] }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ n.message }} </v-list-item-title>
          </v-list-item-content>
        </template>
      </app-bar-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { get } from 'vuex-pathify'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DefaultNotifications',

    data: () => ({
      //
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
      ...get('notifications', [
        'notifications',
        'icons',
      ]),
      ...mapGetters('notifications', [
        'notificationsLength',
      ]),
    },
  }
</script>
