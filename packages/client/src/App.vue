<template>
  <div id="app">
    <div class="posts-list">
      <PostList :loading="$apollo.loading" :posts="posts" />
      <p v-if="!$apollo.loading">
        <button v-if="posts.length > 0" :posts="posts" @click="loadMore">
          More
        </button>
        <button v-else @click="queryPosts">Fetch</button>
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
import { PostsDocument } from '@revue/graphql'

@Component({
  components: {
    PostList,
  },
  data: () => ({
    cursor: null,
    limit: 5,
    count: 5,
  }),
  apollo: {
    posts() {
      return {
        query: PostsDocument,
        variables: {
          cursor: null,
          limit: 5,
          count: 5,
        },
      }
    },
  },
  methods: {
    loadMore() {
      const lastItem = this.posts.length - 1
      this.$apollo.queries.posts.fetchMore({
        variables: {
          cursor: this.posts[lastItem].cursor,
          limit: 5,
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
    queryPosts() {
      this.$apollo.queries.posts.refetch()
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background-color: #fafafa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #192c33;
  max-width: 960px;
  margin: 3em auto;
  display: flex;
}

.posts-list {
  flex: 0 0 100%;
  max-height: 80vh;
  overflow: hidden;
  overflow-y: auto;

  @media (min-width: 600px) {
    flex: 0 0 40%;
  }
}

.post-detail {
  padding: 0 2.5em 2.5em;
  width: 100%;

  h1 {
    margin-top: 0;
  }
}
</style>
