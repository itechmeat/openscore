<template>
  <layout :title="sportName + ' Tournaments'" :back="`/${sportSlug}`">
    <v-container v-if="tournament" grid-list-xl fluid>
      <v-layout row>
        <v-flex xs12>
          <h2>{{ tournament.title }}</h2>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex>
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

  mounted() {
    if (!this.$store.getters.getConnectedStatus) {
      this.$store.dispatch('loadLocalTournaments');
    } else {
      this.$store.dispatch('loadTournaments');
    }
  },

  computed: {
    tournaments() {
      return this.$store.getters.getTournaments;
    },

    tournament() {
      return this.tournaments.find(item => item.id === this.$route.params.id);
    },
  },
};
</script>
