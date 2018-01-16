'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
    modules,
    state,
    getters,
    actions,
    mutations,
    strict: !PROD,
});
