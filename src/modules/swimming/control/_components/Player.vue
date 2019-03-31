<template>
  <div v-if="player" class="cell" @click="$emit('finish')">
    <div
      class="button"
      :class="[{'finished': !!player.time}, {'failed': player.fail}, {'passive': !player.access}]"
    >
      <div class="progress" :class="{'finished': !!player.time}" />
      <div class="name">{{ player.name }}</div>
      <div v-if="player.time" class="time">{{ player.time }}</div>
      <div v-if="player.fail" class="failed">Failed</div>
      <div
        v-if="isFailedButtonVisible"
        class="fail"
        @click.self="$emit('fail')"
      >
        Fail
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      default() {
        return null;
      },
    },
    isFailedButtonVisible: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.cell {
  flex: 1;
  display: flex;
  align-items: center;
  height: 16%;
  max-height: 20vh;
  margin-top: 2px;
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

.name,
.time,
.fail,
.failed {
  position: relative;
}

.time {
  font-family: $ff_digit;
  font-size: 8vw;
  font-weight: 500;
}

.fail {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20vw;
  margin-right: -2vh;
  background: $c_warning;
  cursor: pointer;
}
</style>
