<template>
  <v-app dark>
    <layout>
      <v-content>
        <main-header>
          <template #title>
            Sports Dashboard
          </template>
        </main-header>

        <v-container grid-list-xl>
          <v-layout row>
            <v-flex xs12>
              <router-link to="/swimming">
                Swimming
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </layout>
  </v-app>
</template>

<script>
import Layout from '@/components/Layout';
import MainHeader from '@/components/Header';

export default {
  components: {
    Layout,
    MainHeader,
  },
};
</script>
