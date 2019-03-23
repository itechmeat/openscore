<template>
  <layout>
    <p>
      <router-link :to="$route.name + '/board'">
        Board
      </router-link>
    </p>
    <p>
      <router-link :to="$route.name + '/desk'">
        Desk
      </router-link>
    </p>
  </layout>
</template>

<script>
import Layout from '@/components/Layout';

export default {
  components: {
    Layout,
  },
};
</script>
