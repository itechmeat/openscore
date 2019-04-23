<template>
  <layout title="Edit Tournament" :back="`/${sportSlug}`">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12>
          {{ sportName }}
          <br>
          {{ sportSlug }}
          <br>
          {{ $route.params.id }}
          <tournament-form
            v-if="editedTournament"
            v-model="editedTournament"
            @save="save"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </layout>
</template>

<script>
import Layout from '@/components/Layout/Default';
import TournamentForm from '../components/TournamentForm'

export default {
  components: {
    Layout,
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
    if (!this.$store.getters.getConnectedStatus) {
      this.$store.dispatch('loadLocalTournaments')
        .then(() => {
          this.fillData();
        });
    } else {
      this.$store.dispatch('loadTournaments')
        .then(() => {
          this.fillData();
        });
    }
  },

  data() {
    return {
      tournamentModel: {
        title: '',
        description: null,
        level: 'friendly',
        start_date: null,
        end_date: null,
        // organizer: null,
        cover: null,
        is_draft: true,
        is_archived: false,
        is_public: true,
        // creation_date: null,
        // modification_date: null,
        // location: {
        //   country: null,
        //   city: null,
        // },
      },
      editedTournament: null,
    };
  },

  computed: {
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
  },

  methods: {
    fillData() {
      const tournamentId = this.$route.params.id;

      if (!tournamentId) {
        this.editedTournament = this.tournamentModel;
        return;
      }

      this.editedTournament = this.tournaments.find(t => t.id = tournamentId);
    },

    save() {
      this.$store.dispatch('saveTournament', this.editedTournament)
        .then(id => {
          this.$router.push({ path: `/${this.sportSlug}/tournaments/${id}` })
        });
    },

    remove() {
      this.$store.dispatch('removeTournament', this.editedTournament.id);
    },
  },
};
</script>
