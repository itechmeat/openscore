<template>
  <v-toolbar
    flat
    class="transparent brand"
    :height="64"
  >
    <v-btn
      v-if="!!back"
      icon
      :to="back"
    >
      <v-icon color="white--text">
        arrow_back
      </v-icon>
    </v-btn>
    <v-toolbar-title v-if="hasTitle">
      <h1 class="white--text">
        <slot name="title" />
      </h1>
    </v-toolbar-title>
    <v-spacer />
    <slot />
    <v-spacer />
    <v-toolbar-items
      class="hidden-sm-and-down"
    >
      <slot name="actions" />

      <v-btn
        v-if="isUserAuthenticated"
        flat
        @click="signOut"
      >
        Sign Out
      </v-btn>

      <template v-else>
        <v-btn
          flat
          @click="SignUpDialog = true"
        >
          Sign Up
        </v-btn>
        <v-btn
          flat
          @click="SignInDialog = true"
        >
          Sign In
        </v-btn>
      </template>
    </v-toolbar-items>

    <v-dialog
      v-if="!isUserAuthenticated"
      v-model="SignUpDialog"
      max-width="600"
    >
      <sign-up @close="SignUpDialog = false" />
    </v-dialog>

    <v-dialog
      v-if="!isUserAuthenticated"
      v-model="SignInDialog"
      max-width="600"
    >
      <sign-in @close="SignInDialog = false" />
    </v-dialog>
  </v-toolbar>
</template>

<script>
import SignUp from '@/components/Signup'
import SignIn from '@/components/Signin'

export default {
  components: {
    SignUp,
    SignIn,
  },
  props: {
    back: {
      type: String,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      SignUpDialog: false,
      SignInDialog: false,
    }
  },
  computed: {
    hasTitle () {
      return !!this.$slots.title
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch(('SIGN_OUT'));
    }
  },
}
</script>
