<template>
  <v-card>
    <router-link
      class="card-link"
      :to="'/' + sportSlug + '/tournaments/' + tournament.id"
    >
      <v-img
        class="blue white--text"
        height="200px"
        :src="coverUrl"
        :to="$route.name + '/board'"
      >
        <v-flex class="card-content">
          <h2 v-if="!single" class="headline">
            {{ tournament.title }}
          </h2>
          <h1 v-else class="headline">
            {{ tournament.title }}
          </h1>
          <p>{{ tournament.level }}</p>
          <p v-if="connection">{{ tournament.start_date | luxon:format('dd LLLL y') }} - {{ tournament.end_date | luxon:format('dd LLLL y') }}</p>
          <p>{{ tournament.start_date }}</p>
        </v-flex>
      </v-img>
    </router-link>
    <v-card-actions>
      <v-btn
        flat
        color="primary"
        target="_blank"
        :disabled="false"
        :to="$route.name + '/board'"
      >
        Board
      </v-btn>
      <v-btn
        flat
        color="primary"
        target="_blank"
        :disabled="false"
        :to="$route.name + '/control'"
      >
        Panel
      </v-btn>
      <v-spacer />
      <v-btn
        flat
        color="primary"
        :to="`/${sportSlug}/tournaments/${tournament.id}/edit`"
        :disabled="false"
      >
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    sportSlug: {
      type: String,
      default() {
        return null;
      },
    },
    tournament: {
      type: Object,
      default() {
        return null;
      },
    },
    single: Boolean,
  },
  computed: {
    connection() {
      return this.$store.getters.getConnectedStatus;
    },

    coverUrl() {
      return this.tournament.cover === 'null' ? this.tournament.cover : `/placeholders/tournament_${this.sportSlug}.jpg`;
    }
  },
};
</script>

<style lang="scss" scoped>
.card-link {
  text-decoration: none;
}

.card-content {
  text-shadow: 1px 1px 1px $c_text;
}
</style>
