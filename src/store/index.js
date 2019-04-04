import Vue from 'vue';
import Vuex from 'vuex';
import general from './modules/general'
import user from './modules/user'
import tournaments from './modules/tournaments'
import fakeMatchControl from './modules/fakeMatchControl'
import fakeMatchBoard from './modules/fakeMatchBoard'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    user,
    tournaments,
    fakeMatchControl,
    fakeMatchBoard,
  },
});
