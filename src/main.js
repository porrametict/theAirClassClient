import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

window._ = lodash()


window.moment = moment()
moment.locale('th')

Vue.prototype.get_th_time = function (time) {
    moment.locale('th')
    return moment(time).format('ll')
}


const baseURL = process.env.VUE_APP_BASE_BACKEND_URL
window.baseWsURL = "ws://10.94.0.233:8000/ws"
window.axios = new Axios.create({
    baseURL: baseURL,
    timeout: 60000
})
if (localStorage.getItem('access_token')) {
    window.axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access_token')}`;
}


Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
