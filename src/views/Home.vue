<template>
  <layout title="Sports Dashboard">
    <v-container grid-list-xl fluid>
      <v-layout row>
        <v-flex xs12>
          <h2>All sports</h2>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs4>
          <router-link to="/swimming">
            Swimming
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </layout>
</template>

<script>
import Layout from '@/components/Layout/Default';

export default {
  components: {
    Layout,
  },
};
</script>
