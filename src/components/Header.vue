<template>
  <v-toolbar
    flat
    class="transparent brand"
    :height="64"
  >
    <v-btn
      v-if="!!back"
      icon
      :to="back"
    >
      <v-icon color="white--text">
        arrow_back
      </v-icon>
    </v-btn>
    <v-toolbar-title v-if="hasTitle">
      <h1 class="white--text">
        <slot name="title" />
      </h1>
    </v-toolbar-title>
    <v-spacer />
    <slot />
    <v-spacer />
    <v-toolbar-items
      v-if="hasActions"
      class="hidden-sm-and-down"
    >
      <slot name="actions" />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    hasTitle () {
      return !!this.$slots.title
    },
    hasActions () {
      return !!this.$slots.actions
    }
  },
  props: {
    back: {
      type: String,
      default() {
        return null;
      },
    },
  },
}
</script>
