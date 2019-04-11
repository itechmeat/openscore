<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    fixed
  >
    <v-toolbar-title>
      <v-toolbar-side-icon @click="$emit('drawer')" />
      <span class="hidden-xs-only">{{ title || appName }}</span>
    </v-toolbar-title>
    <v-spacer />

    <v-btn v-if="isUserAuthenticated" flat @click="signOut">Sign Out</v-btn>

    <template v-else>
      <v-btn flat @click="$emit('signup')">Sign Up</v-btn>
      <v-btn flat @click="$emit('signin')">Sign In</v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return process.env.VUE_APP_NAME;
      },
    },
    isUserAuthenticated: Boolean,
  },

  computed: {
    appName() {
      return process.env.VUE_APP_NAME;
    }
  },

  methods: {
    signOut() {
      this.$store.dispatch(('signOut'));
    },
  },
};
</script>
