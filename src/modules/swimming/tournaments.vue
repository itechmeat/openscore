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
import Layout from '@/components/Layout/Default';
import MainHeader from '@/components/Common/Header';

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
