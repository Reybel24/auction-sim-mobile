import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue';
import axios from 'axios'

import App from './components/App';

// Setup axios as the Vue default $http library
axios.defaults.baseURL = 'http://10.0.2.2:5000' // same as the Url the server listens to
axios.defaults.headers.get['Content-Type'] = 'text/html'
Vue.prototype.$http = axios

// Install middleware
import ItemHub from '@/middleware/item-hub.js'
Vue.use(ItemHub)

// Vue.use(VueDevtools)
Vue.config.silent = false;

new Vue({
    render: h => h(App)
}).$start();
