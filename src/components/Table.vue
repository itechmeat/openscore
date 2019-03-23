<template>
  <div class="container">
    <div class="table">
      <div class="row row_head">
        <div
          v-for="column in columns"
          class="cell"
          :class="'cell_' + column"
          :key="column"
        >
          {{ column }}
        </div>
      </div>

      <div
        v-for="player in players"
        class="row"
        :class="[{'row_active': player.time}, !player.place ? '' : 'place_' + player.place ]"
        :key="player.line"
      >
        <div
          v-for="column in columns"
          class="cell"
          :class="'cell_' + column"
          :key="column"
        >
          <span v-if="!player[column]">–</span>
          <span
            v-else
            :class="column"
          >
            {{ player[column] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    match: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    players() {
      return this.match.concat().sort((a, b) => a.line - b.line);
    },
    columns() {
      return Object.keys(this.match[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
}

.table {
  display: table;
  width: 100%;
  height: 100%;
  line-height: 1;
  white-space: nowrap;
}

.row {
  display: table-row;

  &_head {
    background: $c_text_hint;
    color: $c_accent;
    font-weight: 500;
    text-transform: uppercase;
  }

  &:nth-child(even) {
    background: $c_bg_alt;
  }
}

.cell {
  display: table-cell;
  padding: 0 $g*2;
  vertical-align: middle;

  &_line,
  &_place {
    width: 5vw;
    text-align: center;
  }

  &_time {
    width: 14vw;
    text-align: right;
  }
}

.line {
  display: inline-block;
  height: calc(3.2vw + 4px);
  line-height: calc(3.2vw + 8px);
}

.place {
  display: inline-block;

  .place_1 &,
  .place_2 &,
  .place_3 & {
    width: 3.2vw;
    height: 3.2vw;
    line-height: 3.4vw;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  .place_1 & {
    border-color: $c_accent;
    color: $c_warning;
  }

  .place_2 & {
    border-color: $c_text_secondary;
    color: $c_warning;
  }

  .place_3 & {
    border-color: #ffa5a7;
    color: $c_warning;
  }
}

.time {
  color: $c_warning;
  font-size: 3.6vw;
  font-weight: 600;
}
</style>
