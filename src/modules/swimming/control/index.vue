<template>
  <div v-if="match" class="control">
    <div v-if="!isUserAuthenticated" class="demo">Demo mode! <br>You don't have permission to save the results!</div>
    <div class="main" :class="[{'started': isStarted}, {'finished': isFinished}]">
      <div class="start" @click="startMatch">
        <stop-watch
          v-show="isStarted || isFinished"
          ref="stopWatch"
          class="digits"
          minutes
          @start="setStartTime"
          @stop="setStopTime"
          @lap="setLapTime"
        />
        <span v-if="!isStarted && !isFinished" class="label" :class="{'counter': isReady}">
          {{ buttonText }}
        </span>
      </div>

      <div class="actions">
        <div class="action reset" @click="resetMatch">R</div>
        <div class="action next" @click="nextMatch">N</div>
      </div>
    </div>

    <div class="grid" :class="'grid-' + orderedPlayers.length">
      <Player
        v-for="(player, index) in orderedPlayers"
        :key="player.line"
        :player="player"
        :index="index + 1"
        :is-failed-button-visible="!isWait && !player.time && !player.fail && player.access && isFailedButtonsVisible"
        @finish="pushLap(player.line)"
        @fail="fail(player.line)"
      />
    </div>
  </div>
</template>

<script>
import StopWatch from '../../../components/StopWatch'
import Player from './_components/Player'

const STEPS = [
  'wait',
  'ready',
  'started',
  'finished',
];

export default {
  components: {
    StopWatch,
    Player,
  },

  beforeCreate() {
    this.$store.dispatch('loadFakeMatchControl');
  },

  data() {
    return {
      number: 3,
      readyTime: 3000,
      failedTimeAfterStart: 5000,
      isFailedButtonsVisible: false,
      startTimestamp: 0,
      stopTimestamp: 0,
    };
  },

  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },

    match() {
      return this.$store.getters.getFakeMatchControl;
    },

    status() {
      if (!this.match) return;
      return this.match.status;
    },

    isWait() {
      return this.status === STEPS[0];
    },

    isReady() {
      return this.status === STEPS[1];
    },

    isStarted() {
      return this.status === STEPS[2];
    },

    isFinished() {
      return this.status === STEPS[3];
    },

    buttonText() {
      if (this.isReady) {
        return this.number;
      }

      if (this.isStarted) {
        return this.time;
      }

      if (this.isFinished) {
        return 'All Finished!';
      }

      return 'To Start';
    },

    orderedPlayers() {
      return [...this.match.players].sort((a, b) => a.line - b.line);
    },

    places() {
      if (!this.match.players) return;
      return this.match.players
        .map(p => {
          return {
            line: p.line,
            ms: p.time ? Number(p.time.replace(':', '').replace(':', '')) : undefined,
          }
        })
        .filter(item => item.ms !== undefined)
        .sort((a, b) => a.ms - b.ms);
    },
  },

  watch: {
    match: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val) return;

        let finished = 0;

        val.players.forEach(item => {
          if (item.time || item.fail) finished++;
        });

        if (finished === val.players.length && this.stopTimestamp === 0) {
          this.$store.dispatch('changeFakeMatchControlStatus', STEPS[3]);
          this.$refs.stopWatch.stop();
          this.setPlaces();
        }
      },
    },

    status(val) {
      if (val === STEPS[1]) {
        this.isFailedButtonsVisible = true;
        setTimeout(() => {
          this.isFailedButtonsVisible = false;
        }, this.readyTime + this.failedTimeAfterStart)
      }
    },
  },

  methods: {
    save() {
      this.$store.dispatch('saveFakeMatchControl', this.match);
    },

    startMatch() {
      if (this.status !== 'wait') {
        return;
      }

      this.$store.dispatch('changeFakeMatchControlStatus', STEPS[1]);

      const count = () => {
        setTimeout(() => {
          this.number--;
          if (this.number === 0) {
            this.$store.dispatch('changeFakeMatchControlStatus', STEPS[2]);
            this.$refs.stopWatch.start();
            return;
          }
          count();
        }, this.readyTime / 3);
      };

      count();

      this.save();
    },

    fail(line) {
      const player = this.match.players.find(player => player.line === line);
      this.$store.dispatch('setFakeMatchControlFail', player.name);
      this.save();
    },

    pushLap(line) {
      this.$refs.stopWatch.lap(line);
    },

    setStartTime(timestamp) {
      this.startTimestamp = timestamp;
      this.save();
    },

    setStopTime(timestamp) {
      this.stopTimestamp = timestamp;
      this.save();
    },

    setLapTime(timestamp, time, id) {
      const player = this.match.players.find(player => player.line === id);

      if (!this.isStarted || player.time || player.fail || !player.access) {
        return;
      }

      this.$store.dispatch('setFakeMatchControlTime', {name: player.name, time});
      this.save();
    },

    setPlaces() {
      this.match.players.forEach(player => {
        const place = this.places.findIndex(item => item.line === player.line) + 1;
        if (place) {
          player.place = place;
        }
      });
      this.save();
    },

    nextMatch() {
      this.$store.dispatch('nextFakeMatchControl');
      this.updateAll();
    },

    resetMatch() {
      this.$store.dispatch('resetFakeMatchControl');
      this.updateAll();
    },

    updateAll() {
      this.number = 3;
      this.$refs.stopWatch.reset();
      this.$store.dispatch('saveFakeMatchControl', this.match);
      this.startTimestamp = 0;
      this.stopTimestamp = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
$mainSize: 20vh;

.control {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $c_dark;
  color: $c_light;
  font-size: 5vw;
  user-select: none;

  @media (orientation: landscape) {
    font-size: 5vh;
  }
}

.demo {
  flex: 0 0 auto;
  padding: 1vw;
  border-bottom: 2px solid $c_dark;
  background: $c_accent;
  color: $c_warning;
  font-size: 3.5vw;

  @media (orientation: landscape) {
    font-size: 3.5vh;

    br {
      display: none;
    }
  }
}

.main {
  flex: 0 0 $mainSize;
  display: flex;
  align-items: stretch;
  background: $c_success;

  &.started {
    background: $c_accent;
  }

  &.finished {
    background: $c_info;
  }
}

.start {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10vw;
  text-transform: uppercase;
  cursor: pointer;

  @media (orientation: landscape) {
    font-size: 10vh;
  }
}

.label {
  &.counter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $mainSize / 1.6;
    height: $mainSize / 1.6;
    font-family: $ff_digit;
    font-size: 12vh;
    font-weight: 500;
    line-height: 1;
  }
}

.digits {
  font-family: $ff_digit;
  font-size: 18vw;
  font-weight: 500;

  @media (orientation: landscape) {
    font-size: 16vh;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 0 0 $mainSize / 2;

  @media (orientation: landscape) {
    flex-basis: $mainSize * 2;
    flex-direction: row;
  }
}

.action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $mainSize / 2;
  border-left: 2px solid $c_dark;

  &.reset {
    background: $c_warning;
    border-bottom: 1px solid $c_dark;
  }

  &.next {
    background: $c_info;
    border-top: 1px solid $c_dark;
  }

  @media (orientation: landscape) {
    flex: 0 0 $mainSize;

    &.reset {
      border-bottom: none;
    }

    &.next {
      border-top: none;
    }
  }
}

.grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 80vh;

  @media (orientation: landscape) {
    display: block;
    column-count: 2;
    column-gap: 2px;

    &-1,
    &-2 {
      column-count: 1;
    }
  }
}
</style>
