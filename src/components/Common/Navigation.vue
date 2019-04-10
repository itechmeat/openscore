<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
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
      }
    }
  },
}
</script>
