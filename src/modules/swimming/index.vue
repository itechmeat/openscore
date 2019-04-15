<template>
  <layout :title="sportName + ' Tournaments'" back="/">
    <v-container grid-list-xl fluid>
      <v-layout row>
        <v-flex xs12>
          <h2>My tournaments</h2>
        </v-flex>
      </v-layout>

      <v-layout v-if="tournaments.length > 0" row wrap>
        <v-flex v-for="tournament in tournaments" xs12 sm6 md4 xl3 :key="tournament.id">
          <tournament-card
            :sport-slug="sportSlug"
            :tournament="tournament"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </layout>
</template>

<script>
import tournament from '../../lib/mixins/tournament';
import Layout from '@/components/Layout/Default';
import TournamentCard from '@/components/TournamentCard';

export default {
  mixins: [tournament],

  components: {
    Layout,
    TournamentCard,
  },

  created() {
    if (!this.$store.getters.getConnectedStatus) {
      this.$store.dispatch('loadLocalTournaments');
    } else {
      this.$store.dispatch('loadTournaments');
    }
  },

  metaInfo: {
    title: 'Swimming Tournaments',
    titleTemplate: null,
  },

  computed: {
    connection() {
      return this.$store.getters.getConnectedStatus;
    },

    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },

    tournaments() {
      return this.$store.getters.getTournaments;
    },

    userId() {
      return this.$store.getters.getUserId;
    },
  },

  methods: {
    save() {
      this.$store.dispatch('saveTournament', this.editedTournament)
        .then(() => this.dialog = false);
    },

    remove() {
      this.$store.dispatch('removeTournament', this.editedTournament.id)
        .then(() => this.dialog = false);
    },
  },
};
</script>
