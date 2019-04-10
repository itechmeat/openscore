<template>
  <layout>
    <board-header
      v-if="match"
      slot="header"
      clock
      :title="match.title"
      :status="match.status"
      :event="match.event"
      :heat="match.heat"
    />

    <board-table
      v-if="match && match.players.length > 0"
      :players="match.players"
      :status="match.status"
    />
  </layout>
</template>

<script>
import Layout from '@/components/Layout/Basic';
import BoardHeader from '@/components/Board/Header';
import BoardTable from '@/components/Board/Table';

export default {
  components: {
    Layout,
    BoardHeader,
    BoardTable,
  },

  beforeCreate() {
    this.$store.dispatch('loadFakeMatchBoard');
  },

  computed: {
    match() {
      return this.$store.getters.getFakeMatchBoard;
    },
  },
};
</script>
