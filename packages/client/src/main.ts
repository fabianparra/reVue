import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.use(VueApollo)
Vue.config.productionTip = false

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
})

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      post: (_: any, args: any, { getCacheKey }) =>
        getCacheKey({ __typename: 'Post', id: args.id }),
    },
  },
})

const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
  typeDefs: '../../server/src/schema.graphql',
  resolvers: {},
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export const eventBus = new Vue({
  data: {
    favorite: [],
  },
  methods: {
    handleSidebar(arg: string) {
      this.$emit('showSidebar', arg)
    },
  },
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
