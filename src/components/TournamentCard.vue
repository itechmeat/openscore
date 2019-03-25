<template>
  <v-card>
    <router-link
      class="card-link"
      :to="'/' + sport + '/tournaments/' + tournament.id"
    >
      <v-img
        class="blue white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        :to="$route.name + '/board'"
      >
        <h1 class="headline">
          {{ tournament.title }}
        </h1>
        <p>{{ tournament.level }}</p>
        <p>{{ tournament.start_date | luxon:format('dd LLLL y') }} - {{ tournament.end_date | luxon:format('dd LLLL y') }}</p>
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
    sport: {
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
};
</script>

<style lang="scss" scoped>
.card-link {
  text-decoration: none;
}
</style>
