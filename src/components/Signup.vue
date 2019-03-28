<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Sign Up</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-alert
        :value="error"
        type="warning"
      >
        {{ error }}
      </v-alert>

      <v-form v-model="valid">
        <v-text-field
          v-model="email"
          prepend-icon="person"
          name="login"
          label="Email"
          type="email"
          required
          :rules="emailRules"
        />
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          required
          :rules="passwordRules"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :disabled="processing || !valid"
        @click.prevent="signUp"
      >
        Sign Up
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      emailRules: [
        (v) => !!v || 'Please, enter your email',
        // eslint-disable-next-line
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email is incorrect'
      ],
      passwordRules: [
        (v) => !!v || 'Please, enter your password',
        (v) => (v && v.length >= 6) || '6 characters min.'
      ],
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
  },
  methods: {
    signUp() {
      this.$store.dispatch('SIGN_UP', {email: this.email, password: this.password});
    },
  },
};
</script>
