<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-layout
      row
      wrap
      align-center
    >
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

    <v-layout
      row
      wrap
      align-center
    >
      <v-flex xs12>
        <p>Tournament Level</p>
        <v-radio-group
          v-model="value.level"
          row
        >
          <v-radio
            label="Regional"
            value="regional"
            color="green"
          />
          <v-radio
            label="National"
            value="national"
            color="blue"
          />
          <v-radio
            label="International"
            value="international"
            color="red"
          />
        </v-radio-group>
      </v-flex>
    </v-layout>

    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-dialog
          ref="dateFrom"
          v-model="dateFromMenu"
          :return-value.sync="dateFrom"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFrom"
              label="From"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="dateFrom"
            scrollable
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="dateFromMenu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="saveUntilDate(dateFrom)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-dialog
          ref="dateUntil"
          v-model="dateUntilMenu"
          :return-value.sync="dateUntil"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateUntil"
              label="Until"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="dateUntil"
            scrollable
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="dateUntilMenu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="saveUntilDate(dateUntil)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>

    <v-layout
      row
      wrap
      align-center
    >
      <v-flex xs12>
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
        return null;
      },
    },
    isNew: Boolean,
  },

  data() {
    return {
      valid: false,
      titleRules: [
        v => !!v || 'Title is required',
        v => v.length >= 5 || 'Title can\'t be less than 5 characters'
      ],
      hdpList: [5, 10, 20],
      dateFrom: null,
      dateFromMenu: false,
      dateUntil: null,
      dateUntilMenu: false,
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },

  computed: {
    isFormFilled() {
      if (!this.value) {
        return;
      }
      return !!this.value.title && !!this.dateFrom && !!this.value.end_date;
    },
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        // console.log(val);
        if (!val) {
          return;
        }
        this.dateFrom = val.start_date;
        this.dateUntil = val.end_date;
      },
    },
  },

  methods: {
    saveFromDate(val) {
      this.$refs.dateFrom.save(val);
      this.dateFrom = val;
    },

    saveUntilDate(val) {
      this.$refs.dateUntil.save(val);
      this.value.end_date = val;
    },
  },
};
</script>
