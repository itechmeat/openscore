<template>
  <layout>
    <v-content>
      <main-header :back="'/' + sportSlug">
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
    sportSlug: {
      type: String,
      default() {
        return null;
      },
    },
  },
};
</script>
