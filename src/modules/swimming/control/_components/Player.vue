<template>
  <div
    v-if="player"
    class="cell"
    :class="'cell-' + index"
    @click="handleFinish"
  >
    <div
      class="button"
      :class="[{'finished': !!player.time}, {'failed': player.fail}, {'passive': !player.access}]"
    >
      <div class="progress" :class="{'finished': !!player.time}" />
      <div class="line">{{ player.line }}.</div>
      <div class="name">{{ player.name }}</div>
      <div v-if="player.time !== ''" class="time">{{ player.time }}</div>
      <div v-if="player.fail" class="failed">Failed</div>
      <div
        class="fail"
        :class="{'visible': isFailedButtonVisible}"
        @click.self="$emit('fail')"
      >
        Fail
      </div>
    </div>
  </div>
</template>

<script>
const PAUSE_AFTER_FAILING_TIME = 1000;

export default {
  props: {
    player: {
      type: Object,
      default() {
        return null;
      },
    },
    index: {
      type: Number,
      default() {
        return 0;
      },
    },
    isFailedButtonVisible: Boolean,
  },

  data() {
    return {
      canFinish: false,
    };
  },

  watch: {
    isFailedButtonVisible(val) {
      if (val) {
        return;
      }
      setTimeout(() => {
        this.canFinish = true;
      }, PAUSE_AFTER_FAILING_TIME);
    },
  },

  methods: {
    handleFinish() {
      if (!this.canFinish) return;
      this.$emit('finish');
    },
  }
};
</script>

<style lang="scss" scoped>
$mainSize: 20vh;

.cell {
  flex: 1;
  display: flex;
  align-items: center;
  height: 16%;
  max-height: $mainSize;
  margin-top: 2px;

  @media (orientation: landscape) {
    flex: 0 0 50vw;
    align-items: stretch;
    overflow: hidden;
    height: calc(25% - 3px);
    max-height: 20vw;
    margin: 0;
    border-top: 2px solid $c_dark;

    .grid-1 &,
    .grid-2 &,
    .grid-3 &,
    .grid-4 &,
    .grid-5 & {
      height: calc(50% - 1px);
    }

    .grid-6 &,
    .grid-7 & {
      height: calc((100% / 3) - 4px);
    }
  }
}

.button {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 0 2vh;
  background: $c_text_hint;
  cursor: pointer;

  &.passive {
    cursor: default;
    opacity: .6;
  }
}

.progress {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .finished & {
    background: $c_success;
  }

  .failed & {
    background: $c_warning;
  }
}

.line,
.name,
.time,
.fail,
.failed {
  position: relative;
}

.line {
  flex: 0 0 6vw;
}

.name {
  flex: 1;
  letter-spacing: -.4vw;
}

.time {
  font-family: $ff_digit;
  font-size: 8vw;
  font-weight: 500;

  @media (orientation: landscape) {
    font-size: 8vh;
  }
}

.fail {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: $mainSize / 2;
  border-left: 2px solid $c_dark;
  background: $c_warning;
  text-align: center;
  cursor: pointer;
  transform: translateX(calc(#{$mainSize} + 2px));
  transition: transform .2s ease-out;
  will-change: transform;

  &.visible {
    transform: translateX(0);
  }

  .failed & {
    display: none;
  }

  @media (orientation: landscape) {
    width: $mainSize;
  }
}
</style>
