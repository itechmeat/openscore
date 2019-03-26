<template>
  <v-app>
    <layout>
      <v-content>
        <main-header back="/">
          <template #title>
            Tournaments
          </template>
          <template #actions>
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
            row
            wrap
          >
            <v-flex
              v-for="tournament in tmpTournaments"
              xs4
              :key="tournament.id"
            >
              <tournament-card
                :sport="sport"
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
            <h2>{{ !isNew ? 'Edit the tournament' : 'Add a new tournament' }}</h2>
          </v-card-title>
          <v-card-text>
            <tournament-form
              v-if="dialog"
              v-model="editedTournament"
              :is-new="isNew"
            />
          </v-card-text>
          <v-card-actions>
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
    sport: {
      type: String,
      default() {
        return null;
      },
    },
  },
  beforeMount() {
    this.editedTournament = this.tournamentModel;
  },
  data() {
    return {
      dialog: false,
      tournamentModel: {
        title: '',
        level: 'regional',
        start_date: null,
        end_date: null,
        organizer: null,
        cover: null,
        location: {
          country: null,
          city: null,
        },
      },
      editedTournament: null,
      tmpTournaments: [
        {
          id: 1,
          title: 'Regional Coup',
          level: 'regional',
          start_date: '2019-02-20',
          end_date: '2019-02-24',
          organizer: null,
          cover: null,
          location: {
            country: null,
            city: null,
          },
        },
        {
          id: 2,
          title: 'National Coup',
          level: 'national',
          start_date: '2019-02-25',
          end_date: '2019-02-28',
          organizer: null,
          cover: null,
          location: {
            country: null,
            city: null,
          },
        },
        {
          id: 3,
          title: 'International Coup',
          level: 'international',
          start_date: '2019-03-03',
          end_date: '2019-03-10',
          organizer: null,
          cover: null,
          location: {
            country: null,
            city: null,
          },
        },
      ],
    };
  },
  computed: {
    isNew() {
      return !this.editedTournament.id;
    },
  },
  methods: {
    editTournament(id) {
      if (!id) {
        this.editedTournament = this.tournamentModel;
      } else {
        this.editedTournament = this.tmpTournaments.find(tournament => tournament.id === id);
      }
      this.$nextTick(() => {
        this.dialog = true;
      });
    },
  },
};
</script>
