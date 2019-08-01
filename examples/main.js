import Vue from 'vue'
import App from './App.vue'
import ButtonThree from '../packages/index'

Vue.use(ButtonThree)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
