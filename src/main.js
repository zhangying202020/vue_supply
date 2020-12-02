import Vue from 'vue'
import App from './App'
import router from './router'
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
import VueParticles from 'vue-particles'
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueParticles)
Vue.use(ViewUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
