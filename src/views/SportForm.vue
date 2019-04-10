<template>
  <layout title="Edit Tournament" back="/">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12>
          {{ sportName }}
          <br>
          {{ sportSlug }}
          <br>
          {{ $route.params.id }}
          <tournament-form
            v-model="editedTournament"
            :is-new="!tournamentId"
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

  beforeMount() {
    this.editedTournament = this.tournamentModel;
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
    tournamentId() {
      return this.$route.params.id;
    },
  },
};
</script>
