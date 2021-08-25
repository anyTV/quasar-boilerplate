import { createStore } from 'vuex'

export default function () {
  const Store = createStore({
    modules: {
      // example
    },

    strict: process.env.DEBUGGING
  });

  return Store;
}