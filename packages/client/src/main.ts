import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.use(VueApollo)
Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
