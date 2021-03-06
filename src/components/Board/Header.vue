<template>
  <header>
    <div class="main">
      <h1>{{ title }}</h1>
    </div>

    <div v-if="!connection" class="connection">
      offline
    </div>

    <div v-if="clock && !isStopWatchVisible && connection" class="clock">
      {{ hours }}<span class="colon">:</span>{{ minutes }}
    </div>

    <stop-watch
      v-show="isStopWatchVisible && connection"
      ref="stopWatch"
      class="clock stop-watch"
      :class="{'finished': status === 'finished'}"
      minutes
    />

    <div class="info">
      <div v-if="event" class="line event">
        <span class="label">Event</span>
        <span class="value">{{ event }}
        </span>
      </div>
      <div v-if="heat" class="line heat">
        <span class="label">Heat</span>
        <span class="value">{{ heat }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import StopWatch from '../StopWatch'

export default {
  components: {
    StopWatch,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    clock: {
      type: Boolean,
    },
    event: {
      type: Number,
      default: 0,
    },
    heat: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      today: new Date(),
    };
  },

  computed: {
    hours() {
      const hours = this.today.getHours();
      return hours < 10 ? '0' + hours : hours;
    },

    minutes() {
      const minutes = this.today.getMinutes();
      return minutes < 10 ? '0' + minutes : minutes;
    },

    connection() {
      return this.$store.getters.getConnectedStatus;
    },

    isStopWatchVisible() {
      return this.status === 'started';
    },
  },

  watch: {
    status(val) {
      if (val === 'started') {
        this.$refs.stopWatch.start();
      }
      if (val === 'finished') {
        this.$refs.stopWatch.stop();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: $g*14;
  padding: $g $g*2;

  @media (orientation: portrait) {
    flex-wrap: wrap;
    padding-top: $g*3;
    padding-bottom: $g*3;
  }
}

.main {
  flex: 0 0 auto;
  margin-right: $g*4;

  @media (orientation: portrait) {
    flex: 0 0 100%;
    margin-bottom: 4vw;
    text-align: center;
  }
}

h1 {
  margin: 0;
  font-size: 5vw;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.5vw;

  @media (orientation: portrait) {
    font-size: 9vw;
  }
}

.clock,
.connection {
  flex: 1;
  color: $c_text_hint;
  font-size: 5vw;
  font-weight: 500;
  text-align: center;

  @media (orientation: portrait) {
    font-size: 12vw;
    text-align: right;
  }
}

.clock {
  font-family: $ff_digit;

  @media (orientation: portrait) {
    order: 3;
    margin-right: $g*4;
  }
}

.connection,
.stop-watch {
  color: $c_warning;
}

.stop-watch.finished {
  color: $c_success;
}

.colon {
  animation: colon 1s infinite linear;
}

.info {
  flex: 0 0 auto;
  display: flex;
  font-size: 3.2vw;
  text-align: right;

  @media (orientation: portrait) {
    display: block;
    font-size: 5vw;
    text-align: left;
  }
}

.line {
  margin-left: $g*4;
  letter-spacing: -0.2vw;

  @media (orientation: portrait) {
    display: flex;
    justify-content: space-between;
  }
}

.value {
  padding-left: $g*2;
  font-family: $ff_digit;
  font-weight: 500;
  color: $c_primary;
}

@keyframes colon {
  0% {opacity: 1;}
  40% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 0;}
}
</style>
