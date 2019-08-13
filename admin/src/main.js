// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import './plugins/element.js'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

// new Vue({
//     router,
//     render: h => h(app)
// }).$mount('#app')