import VueDevtools from 'nativescript-vue-devtools'
import Vue from "nativescript-vue";

import App from "./components/App";

// Vue.use(VueDevtools)
// Vue.config.silent = false;

new Vue({
    render: h => h(App)
}).$start();
