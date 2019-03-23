<template>
  <header>
    <div class="main">
      <h1>{{ title }}</h1>
    </div>
    <div
      v-if="time"
      class="time"
    >
      12:52
    </div>
    <div class="info">
      <div
        v-if="event"
        class="line event"
      >
        <span class="label">Event</span>
        <span class="value">{{ event }}
        </span>
      </div>
      <div
        v-if="heal"
        class="line heal"
      >
        <span class="label">Heal</span>
        <span class="value">{{ heal }}</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: Boolean,
    },
    event: {
      type: Number,
      default: 0,
    },
    heal: {
      type: Number,
      default: 0,
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
}

.main {
  flex: 0 0 auto;
  margin-right: $g*4;
}

h1 {
  margin: 0;
  font-size: $fs_headline;
  font-weight: 500;
  line-height: 1;
}

.time {
  flex: 1;
  color: $c_text_hint;
  font-size: $fs_headline;
  font-weight: 500;
  text-align: center;
}

.info {
  flex: 0 0 auto;
  display: flex;
  font-size: $fs_large;
  text-align: right;
}

.line {
  margin-left: $g*4;
}

.label,
.value {
  display: table-cell;
}

.value {
  padding-left: $g*2;
  color: $c_primary;
}
</style>
