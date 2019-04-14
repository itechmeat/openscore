<template>
  <div class="wrapper">
    <div class="table">
      <div class="row row_head">
        <div
          v-for="column in columns"
          class="cell"
          :class="'cell_' + column.name"
          :key="column.name"
        >
          {{ column.label }}
        </div>
      </div>

      <div
        v-for="player in orderedPlayers"
        class="row"
        :class="[
          {'row_active': player.time},
          {'row_failed': player.fail},
          !player.place ? '' : 'place_' + player.place,
        ]"
        :key="player.line"
      >
        <div
          v-for="column in columns"
          class="cell"
          :class="'cell_' + column.name"
          :key="column.name"
        >
          <template v-if="column.name === 'time'">
            <span v-if="!player.fail && !player.time">-</span>
            <span v-else :class="player.fail ? 'fail' : 'time'">
              {{ player.fail ? 'Failed' : player.time }}
            </span>
          </template>
          <template v-else-if="column.name === 'place'">
            <span :class="[player.fail ? 'place-fail' : 'place-' + player.place]">
              <template v-if="status !== 'finished' || player.fail">-</template>
              <template v-else>
                {{ player.place }}
              </template>
            </span>
          </template>
          <template v-else>
            <span v-if="!player[column.name]">–</span>
            <span v-else :class="column.name">
              {{ player[column.name] }}
            </span>
            <div v-if="column.name === 'name'" class="team-v">
              {{ player.team }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Array,
      default() {
        return [];
      },
    },
    status: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      excludedCells: ['fail', 'access'],
      columns: [
        {
          name: 'line',
          label: 'Line',
        },
        {
          name: 'place',
          label: 'Place',
        },
        {
          name: 'name',
          label: 'Name',
        },
        {
          name: 'team',
          label: 'Team',
        },
        {
          name: 'time',
          label: 'Time',
        },
      ],
    };
  },

  computed: {
    orderedPlayers() {
      return this.players.concat().sort((a, b) => a.line - b.line);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  flex: 1;
}

.table {
  display: table;
  width: 100%;
  height: 100%;
  font-size: $fs_board_base;
  line-height: 1;
  white-space: nowrap;

  @media (orientation: portrait) {
    font-size: 4vw;
  }
}

.row {
  display: table-row;

  &_head {
    background: $c_text_hint;
    color: $c_accent;
    text-transform: uppercase;
  }

  &:nth-child(even) {
    background: $c_bg_alt;
  }

  &_failed {
    color: $c_warning;
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

  @media (orientation: portrait) {
    .row_head & {
      height: 12vw;
    }

    &_line,
    &_place {
      .row:not(.row_head) & {
        font-size: 6.6vw;
      }
    }

    &_team {
      display: none;
    }
  }
}

.line {
  display: inline-block;
  height: calc(3.2vw + 4px);
  line-height: calc(3.2vw + 8px);
}

.place-1,
.place-2,
.place-3 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2vw;
  height: 3.2vw;
  line-height: 1;
  border: 2px solid transparent;
  border-radius: 50%;

  @media (orientation: portrait) {
    width: 8vw;
    height: 8vw;
  }
}

.place-1 {
  border-color: $c_accent;
  color: $c_accent;
}

.place-2 {
  border-color: $c_text_secondary;
  color: $c_accent;
}

.place-3 {
  border-color: #ffa5a7;
  color: $c_accent;
}

.time {
  color: $c_success;
  font-family: $ff_digit;
  font-size: 3.6vw;
  font-weight: 500;

  @media (orientation: portrait) {
    font-size: 7vw;
  }
}

.row_head,
.name,
.team {
  letter-spacing: -0.2vw;
}

.team-v {
  display: none;

  @media (orientation: portrait) {
    display: block;
    margin-top: 1vw;
    opacity: .4;
  }
}
</style>
