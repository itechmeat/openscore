<template>
  <v-app dark>
    <layout>
      <v-content>
        <main-header back="/">
          <template #title>
            {{ sportName }} Tournaments
          </template>
          <template
            v-if="isUserAuthenticated"
            #actions
          >
            <v-btn
              flat
              @click.stop="editTournament(null)"
            >
              Add Tournament
            </v-btn>
          </template>
        </main-header>

        <v-container grid-list-xl>
          <v-layout row>
            <v-flex xs12>
              <h2>My tournaments</h2>
            </v-flex>
          </v-layout>

          <v-layout
            v-if="tournaments.length > 0"
            row
            wrap
          >
            <v-flex
              v-for="tournament in tournaments"
              xs4
              :key="tournament.id"
            >
              <tournament-card
                :sport-slug="sportSlug"
                :tournament="tournament"
                @edit="editTournament"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <v-card>
          <v-card-title>
            <h2>{{ !isNew ? 'Edit the Tournament' : 'Add a new Tournament' }}</h2>
          </v-card-title>
          <v-card-text>
            <tournament-form
              v-if="dialog"
              v-model="editedTournament"
              :is-new="isNew"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              flat="flat"
              @click="dialog = false"
            >
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn
              color="red darken-1"
              flat="flat"
              @click="dialog = false"
            >
              Delete
            </v-btn>
            <v-btn
              color="blue darken-1"
              flat="flat"
              :disabled="!isFormFilled"
              @click="dialog = false"
            >
              {{ !isNew ? 'Save Tournament' : 'Create Tournament' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </layout>
  </v-app>
</template>

<script>
import Layout from '@/components/Layout';
import MainHeader from '@/components/Header';
import TournamentCard from '@/components/TournamentCard';
import TournamentForm from '@/components/TournamentForm';

export default {
  components: {
    Layout,
    MainHeader,
    TournamentCard,
    TournamentForm,
  },
  props: {
    sportName: {
      type: String,
      default() {
        return null;
      },
    },
    sportSlug: {
      type: String,
      default() {
        return null;
      },
    },
  },
  created() {
    this.$store.dispatch('LOAD_TOURNAMENTS');
  },
  beforeMount() {
    this.editedTournament = this.tournamentModel;
  },
  data() {
    return {
      dialog: false,
      tournamentModel: {
        title: '',
        description: null,
        level: null,
        start_date: null,
        end_date: null,
        organizer: null,
        cover: null,
        is_draft: true,
        is_archived: false,
        is_public: true,
        creation_date: null,
        modification_date: null,
        location: {
          country: null,
          city: null,
        },
      },
      editedTournament: null,
    };
  },
  computed: {
    tournaments() {
      return this.$store.getters.getTournaments;
    },
    isNew() {
      return !this.editedTournament.id;
    },
    isFormFilled() {
      if (!this.editedTournament) {
        return;
      }
      return !!this.editedTournament.title && !!this.editedTournament.level && !!this.editedTournament.start_date && !!this.editedTournament.end_date;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
  },
  methods: {
    editTournament(id) {
      if (!id) {
        this.editedTournament = this.tournamentModel;
      } else {
        this.editedTournament = this.tournaments.find(tournament => tournament.id === id);
      }
      this.$nextTick(() => {
        this.dialog = true;
      });
    },
  },
};
</script>
