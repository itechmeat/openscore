<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-text-field
          v-model="value.title"
          :rules="titleRules"
          :counter="50"
          label="Title Tournament"
          required
        />
      </v-flex>
    </v-layout>

    <v-layout row wrap align-center>
      <v-flex xs12>
        <p>Tournament Level</p>
        <v-radio-group v-model="value.level" row>
          <v-radio label="Friendly" value="friendly" color="yellow" />
          <v-radio label="Regional" value="regional" color="green" />
          <v-radio label="National" value="national" color="blue" />
          <v-radio label="International" value="international" color="red" />
        </v-radio-group>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs5>
        <v-menu
          v-model="dateFromMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="value.start_date"
              label="From"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="value.start_date" @input="dateFromMenu = false" />
        </v-menu>
      </v-flex>
      <v-flex xs1 />
      <v-flex xs5>
        <v-menu
          v-model="dateUntilMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="value.end_date"
              label="Until"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="value.end_date" @input="dateUntilMenu = false" />
        </v-menu>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs4>
        <v-btn
          large
          block
          :disabled="!isFormFilled"
          @click="$emit('save')"
        >
          {{ !isNew ? 'Save Tournament' : 'Create Tournament' }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      valid: false,
      titleRules: [
        v => !!v || 'Title is required',
        v => v.length >= 3 || 'Title can\'t be less than 3 characters'
      ],
      dateFromMenu: false,
      dateUntilMenu: false,
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },

  computed: {
    isNew() {
      return this.value.id;
    },

    connection() {
      return this.$store.getters.getConnectedStatus;
    },

    tournaments() {
      return this.$store.getters.getTournaments;
    },

    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },

    userId() {
      return this.$store.getters.getUserId;
    },

    isFormFilled() {
      if (!this.value) {
        return;
      }
      return !!this.value.title && !!this.value.start_date && !!this.value.end_date;
    },
  },
};
</script>
