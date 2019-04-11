<template>
  <v-navigation-drawer
    app
    fixed
    class="navigation"
    :clipped="$vuetify.breakpoint.mdAndUp"
    :value="isActive"
  >
    <v-list dense>
      <v-list-tile v-for="item in items" :key="item.text" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-spacer />

    <v-layout pa-3 caption class="version">v{{ version }}</v-layout>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    }
  }
}
</script>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
}

.version {
  flex: 0 0 auto;
}
</style>
