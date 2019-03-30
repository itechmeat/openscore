<template>
  <layout>
    <board-header
      slot="header"
      title="Super Cup"
      clock
      :event="7"
      :heal="2"
    />

    <board-table
      :match="match"
    />
  </layout>
</template>

<script>
import Layout from '@/components/Layout';
import BoardHeader from '@/components/Board/Header';
import BoardTable from '@/components/Board/Table';

import MATCH from "../../../data/match";

export default {
  components: {
    Layout,
    BoardHeader,
    BoardTable,
  },
  data() {
    return {
      match: MATCH,
    };
  },
};
</script>
