<template>
  <v-app dark>
    <layout>
      <v-content>
        <main-header>
          <template #title>
            Sports Dashboard
          </template>
        </main-header>

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
      </v-content>
    </layout>
  </v-app>
</template>

<script>
import Layout from '@/components/Layout';
import MainHeader from '@/components/Header';
import TournamentForm from '../components/TournamentForm'

export default {
  components: {
    Layout,
    MainHeader,
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
