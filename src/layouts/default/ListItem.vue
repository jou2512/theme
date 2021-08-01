<template>
  <v-list-item
    :href="item.href"
    :rel="item.href ? 'nofollow' : undefined"
    :target="item.href ? '_blank' : undefined"
    :to="item.to"
    active-class="primary white--text"
    link
    class="py-1"
    v-bind="$attrs"
    v-on="$listeners"
    @click="logout()"
  >
    <v-list-item-icon
      v-if="!item.icon"
      class="text-caption text-uppercase justify-center ml-1 my-2 align-self-center"
    >
      {{ title }}
    </v-list-item-icon>

    <v-list-item-avatar v-if="item.avatar">
      <v-img :src="item.avatar" />
    </v-list-item-avatar>

    <v-list-item-icon
      v-if="item.icon"
      class="my-2 align-self-center"
    >
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="item.title">
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  export default {
    name: 'DefaultListItem',

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      title () {
        const matches = this.item.title.match(/\b(\w)/g)

        return matches.join('')
      },
    },

    methods: {
      async logout () {
        return Promise.resolve()
          .then(() => {
            if (this.item.logout) {
              console.log('1')
              return this.item.logout()
            } else {
              return console.log('fksjfkasd')
            }
          })
      },
    },
  }
</script>
