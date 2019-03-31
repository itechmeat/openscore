<template>
  <v-card>
    <router-link
      class="card-link"
      :to="'/' + sportSlug + '/tournaments/' + tournament.id"
    >
      <v-img
        class="blue white--text"
        height="200px"
        :src="tournament.cover || undefined"
        :to="$route.name + '/board'"
      >
        <h1 class="headline">
          {{ tournament.title }}
        </h1>
        <p>{{ tournament.level }}</p>
        <p v-if="connection">{{ tournament.start_date | luxon:format('dd LLLL y') }} - {{ tournament.end_date | luxon:format('dd LLLL y') }}</p>
        <p>{{ tournament.start_date }}</p>
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
        Control panel
      </v-btn>
      <v-spacer />
      <v-btn
        flat
        color="primary"
        :disabled="false"
        @click="$emit('edit', tournament.id)"
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
  },
  computed: {
    connection() {
      return this.$store.getters.getConnectedStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-link {
  text-decoration: none;
}
</style>
