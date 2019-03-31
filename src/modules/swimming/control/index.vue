<template>
  <div class="control">
    <div
      class="start"
      :class="[{'started': isStarted}, {'finished': isFinished}]"
      @click="startMatch"
    >
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

    <div v-if="players.length > 0" class="grid">
      <Player
        v-for="player in players"
        :key="player.line"
        :player="player"
        :is-failed-button-visible="!player.time && !player.fail && player.access && isFailedButtonsVisible"
        @finish="finish(player.line)"
        @fail="fail(player.line)"
      />
    </div>
  </div>
</template>

<script>
import StopWatch from '../../../components/StopWatch'
import Player from './_components/Player'
import MATCH from "../../../data/match";

const STAGES = [
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
  data() {
    return {
      match: MATCH,
      state: 0,
      number: 3,
      readyTime: 3000,
      failedTimeAfterStart: 5000,
      isFailedButtonsVisible: false,

      startTimestamp: 0,
      stopTimestamp: 0,
    };
  },

  computed: {
    isReady() {
      return STAGES[this.state] === 'ready'
    },

    isStarted() {
      return STAGES[this.state] === 'started'
    },

    isFinished() {
      return STAGES[this.state] === 'finished'
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

    // @Todo: remove it after Firebase connection!
    players() {
      return this.match.map(player => {
        player.time = null;
        player.fail = false;
        player.access = true;
        return player;
      });
    },
  },

  watch: {
    match: {
      deep: true,
      handler(val) {
        let finished = 0;

        val.forEach(item => {
          if (item.time || item.fail) {
            finished++;
          }
        });

        if (finished === val.length) {
          this.state = 3;
          this.$refs.stopWatch.stop();
        }
      },
    },

    state(val) {
      if (val === 1) {
        this.isFailedButtonsVisible = true;
        setTimeout(() => {
          this.isFailedButtonsVisible = false;
        }, this.readyTime + this.failedTimeAfterStart)
      }
    },
  },

  methods: {
    startMatch() {
      if (this.state > 0) {
        return;
      }

      this.state = 1;


      const count = () => {
        setTimeout(() => {
          this.number--;
          if (this.number === 0) {
            this.state = 2;
            this.$refs.stopWatch.start();
            return;
          }
          count();
        }, this.readyTime / 3);
      };

      count();
    },

    fail(line) {
      const player = this.match.find(player => player.line === line);
      player.fail = true;
    },

    finish(line) {
      this.$refs.stopWatch.lap(line);
    },

    setStartTime(timestamp) {
      this.startTimestamp = timestamp;
    },

    setStopTime(timestamp) {
      this.stopTimestamp = timestamp;
    },

    setLapTime(timestamp, time, id) {
      const player = this.match.find(player => player.line === id);

      if (!this.isStarted || player.time || player.fail || !player.access) {
        return;
      }

      player.time = time;
    }
  },
};
</script>

<style lang="scss" scoped>
.control {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $c_bg;
  font-size: 5vw;
  user-select: none;
}

.start {
  flex: 0 0 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $c_success;
  font-size: 10vw;
  text-transform: uppercase;
  cursor: pointer;

  &.started {
    background: $c_accent;
  }

  &.finished {
    background: $c_info;
  }
}

.label {
  &.counter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16vh;
    height: 16vh;
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
}

.grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 80vh;
}
</style>
