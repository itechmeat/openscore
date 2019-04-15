<template>
  <v-app>
    <navigation :is-active="drawer" :items="navigationItems" />

    <app-header
      :title="title"
      :is-user-authenticated="isUserAuthenticated"
      @drawer="drawer = !drawer"
      @signup="SignUpDialog = true"
      @signin="SignInDialog = true"
    />

    <v-content>
      <slot />
    </v-content>

    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-if="!isUserAuthenticated" v-model="SignUpDialog" max-width="600px">
      <sign-up @close="SignUpDialog = false" />
    </v-dialog>

    <v-dialog v-if="!isUserAuthenticated" v-model="SignInDialog" max-width="600">
      <sign-in @close="SignInDialog = false" />
    </v-dialog>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Common/Header'
import Navigation from '@/components/Common/Navigation'
import SignUp from '@/components/Common/Signup'
import SignIn from '@/components/Common/Signin'

export default {
  components: {
    AppHeader,
    Navigation,
    SignUp,
    SignIn,
  },

  props: {
    title: {
      type: String,
      default() {
        return null;
      },
    },
    back: {
      type: String,
      default() {
        return null;
      },
    },
  },

  data: () => ({
    dialog: false,
    drawer: null,

    SignUpDialog: false,
    SignInDialog: false,
  }),

  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },

    navigationItems() {
      return [
        this.back ? { icon: 'arrow_back', text: 'Back', link: this.back } : undefined,
        { icon: 'settings', text: 'Settings (404)', link: '/settings' },
        { icon: 'help', text: 'Help (404)', link: '/help' },
      ].filter(item => item !== undefined);
    },
  },

  methods: {
    signOut() {
      this.$store.dispatch(('signOut'));
    },
  },
};
</script>
