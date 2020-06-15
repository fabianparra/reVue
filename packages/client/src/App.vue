<template>
  <div id="app">
    <div class="posts-list">
      <PostList :loading="$apollo.loading" :posts="posts" />
      <p>
        <button @click="loadMore">More</button>
      </p>
    </div>
    <div class="post-detail">
      <router-view />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList.vue'
import { Component, Vue } from 'vue-property-decorator'
import { POSTS_QUERY } from '../graphql/queries/getPosts'

@Component({
  components: {
    PostList,
  },
  data: () => ({
    cursor: null,
    count: 5,
    limit: 5,
  }),
  apollo: {
    posts: {
      query: POSTS_QUERY,
      variables: {
        cursor: null,
        limit: 5,
        count: 5,
      },
    },
  },
  methods: {
    loadMore() {
      const lastItem = this.posts.length - 1

      this.$apollo.queries.posts.fetchMore({
        variables: {
          cursor: this.posts[lastItem].cursor,
          limit: 10,
          count: this.count + this.count,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) return prev
          return Object.assign({}, prev, {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          })
        },
      })
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background-color: #f7f7f7;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 3em auto;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
  display: flex;
}

.posts-list {
  flex: 0 0 40%;
  max-height: 80vh;
  overflow: hidden;
  overflow-y: auto;
}

.post-detail {
  padding: 2.5em;
  width: 100%;
}
</style>
