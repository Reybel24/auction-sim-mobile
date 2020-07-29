import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import { randomNumberBetween } from "@/util/common.js";

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    placeBid({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        console.log('placing bid for ' + payload.itemId)

        // Bid data
        var data = new FormData();
        data.append('amount', payload.bidAmount);
        data.append('bidderId', '7');
        data.append('timestamp', '7-28-2020:10:31:48');

        Vue.prototype.$http({
          url: `/api/auction-items/` + payload.itemId + '/bid',
          method: 'post',
          headers: { 'content-type': 'multipart/form-data' },
          data: data,
        })
          .then(res => {
            // console.log(res.data)

            // Subscribe to changes to this specific item (joins item group)
            // return this.$itemHub.itemOpened(this.item.id);
            resolve(res);
          })
          .catch(error => {
            console.log('Something went wrong');
            console.log(error);
            reject(error);
          });
      });
    },
  },
  modules: {
  },
  computed: {
  }
})
