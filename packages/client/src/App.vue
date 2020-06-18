<template>
  <div id="app">
    <header>
      <a @click="goHome">
        <img src="./assets/revue-1.svg" width="100px;" alt="reVue" />
      </a>
    </header>
    <main id="main">
      <div class="posts-list" :class="{ open: sidebarOpen }">
        <PostList :loading="$apollo.loading" :posts="posts" />
        <p v-if="!$apollo.loading">
          <button class="custom-btn" v-if="posts.length > 0" @click="loadMore">
            Load More
          </button>
          <button class="custom-btn" v-else @click="queryPosts">Fetch</button>

          <button
            class="custom-btn btn-secondary"
            v-if="posts.length > 0"
            @click="clearPosts"
          >
            Clear List
          </button>
        </p>
      </div>
      <div class="post-detail">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import PostList from '@/components/PostList.vue'
import { Component, Vue } from 'vue-property-decorator'
import { PostsDocument, DeletePostDocument, Post } from '@revue/graphql'
import { eventBus } from './main'

@Component({
  components: {
    PostList,
  },
  data: () => ({
    cursor: null,
    limit: 5,
    posts: [],
    count: 5,
    sidebarOpen: false,
  }),
  apollo: {
    posts() {
      return {
        query: PostsDocument,
        variables: {
          cursor: this.cursor,
          limit: this.limit,
          count: this.count,
        },
      }
    },
  },
  methods: {
    goHome() {
      if (this.$route.path !== '/') this.$router.push({ path: '/' })
      this.queryPosts()
    },
    loadMore() {
      const lastItem = this.$data.posts.length - 1
      this.$apollo.queries.posts.fetchMore({
        variables: {
          cursor: this.$data.posts[lastItem].cursor,
          limit: this.$data.limit,
          count: this.$data.count + this.$data.count,
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
      this.$apollo.queries.posts.refetch({
        cursor: null,
        limit: 5,
        count: 5,
      })
      eventBus.handleSidebar('open')
    },
    deletePost(post: Post) {
      this.$apollo.mutate({
        mutation: DeletePostDocument,
        variables: {
          id: post.id,
        },
        update: (store, { data: { deletePost: id } }) => {
          const data: any = store.readQuery({
            query: PostsDocument,
            variables: {
              cursor: null,
              limit: 5,
              count: 5,
            },
          })

          data.posts = data.posts.filter((p: Post) => {
            return p.id !== id
          })
        },
      })
    },
    clearPosts() {
      this.$data.posts.map((post: Post) => {
        setTimeout(() => this.deletePost(post), 500)
      })
    },
  },
  created() {
    eventBus.$on('showSidebar', (data: string) => {
      this.$data.sidebarOpen = data === 'open'
    })
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background-color: #fafafa;
}

header {
  text-align: center;
  margin-bottom: 2em;
  //border-bottom: 1px solid #f0f2f3;
  border-bottom: 3px solid #445465;
}

#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #192c33;
  max-width: 960px;
  margin: 0 auto 3em;
  display: flex;
}

.posts-list {
  background-color: #fafafa;
  flex: 0 0 100%;
  max-height: 85vh;
  min-height: 80vh;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  transition: all 0.3s;
  transform: translateX(-100%);
  width: 100%;
  z-index: 9;

  @media (min-width: 600px) {
    flex: 0 0 40%;
    position: relative;
    transform: none;
  }

  &.open {
    transform: none;
  }
}

.post-detail {
  flex: 100%;
  max-height: 80vh;
  overflow: hidden;
  overflow-y: auto;
  position: relative;

  @media (min-width: 600px) {
    flex: 0 0 60%;
  }

  h1 {
    margin-top: 0;
    font-size: 1.2em;
    font-style: italic;
    quotes: '\00AB''\00BB''\201E''\201C';

    @media (min-width: 600px) {
      font-size: 1.5em;
    }

    &:before {
      content: open-quote;
    }

    &:after {
      content: close-quote;
    }
  }
}

.custom-btn {
  background-color: #42b983;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  line-height: 1;
  padding: 1em 2em;
  margin: 0 1em 1em;

  &.btn-secondary {
    background-color: #445465;
  }
}
</style>
