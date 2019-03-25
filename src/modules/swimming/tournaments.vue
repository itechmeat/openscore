<template>
  <layout>
    <v-content>
      <main-header :back="'/' + sport">
        <template #title>
          Tournament #{{ $route.params.id }}
        </template>
        <template #actions>
          <v-btn
            flat
          >
            Add Matches
          </v-btn>
        </template>
      </main-header>
    </v-content>
  </layout>
</template>

<script>
import Layout from '@/components/Layout';
import MainHeader from '@/components/Header';

export default {
  components: {
    Layout,
    MainHeader,
  },
  props: {
    sport: {
      type: String,
      default() {
        return null;
      },
    },
  },
};
</script>
