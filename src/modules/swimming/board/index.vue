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

export default {
  components: {
    Layout,
    BoardHeader,
    BoardTable,
  },
  data() {
    return {
      match: [
        {
          line: 8,
          place: 1,
          name: 'Mark Zuckerberg',
          team: 'Facebook',
          time: '01:24:59',
        },
        {
          line: 6,
          place: 7,
          name: 'Tim Cook',
          team: 'Apple',
          time: '01:53:02',
        },
        {
          line: 3,
          place: 2,
          name: 'Jonathan Ive',
          team: 'Apple',
          time: '01:25:03',
        },
        {
          line: 4,
          place: null,
          name: 'Larry Page',
          team: 'Google',
          time: null,
        },
        {
          line: 5,
          place: 3,
          name: 'Jeff Bezos',
          team: 'Amazon',
          time: '01:32:44',
        },
        {
          line: 1,
          place: 4,
          name: 'Sergey Brin',
          team: 'Google',
          time: '01:33:10',
        },
        {
          line: 7,
          place: 6,
          name: 'Andrew McCollum',
          team: 'Facebook',
          time: '01:42:01',
        },
        {
          line: 2,
          place: 5,
          name: 'Dustin Aaron Moskovitz',
          team: 'Facebook',
          time: '01:33:40',
        },
      ],
    };
  },
};
</script>
