<template>
  <div v-if="post" class="post">
    <div class="post-detail-nav">
      <a class="back-btn" @click="showSidebar">
        <img src="../assets/left-angle.svg" />
      </a>
    </div>
    <h1>{{ post.title }}</h1>
    <div class="post-detail-meta">
      <div class="post-detail-author">by {{ post.author }}</div>
      <div class="post-detail-comments">{{ post.num_comments }} Comments</div>
    </div>
    <div class="post-detail-image">
      <img v-if="post.image" :src="post.image" :alt="post.title" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import gql from 'graphql-tag'
import { eventBus } from '../main'

const PostQuery = gql`
  query postQuery {
    post(id: $id) {
      id
      title
      image
      num_comments
      author
    }
  }
`

@Component({
  apollo: {
    post: {
      query: PostQuery,
      loadingKey: 'loading',
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
    },
  },
  methods: {
    showSidebar() {
      eventBus.handleSidebar('open')
    },
  },
  mounted() {
    if (!this.$data.post) this.$router.push({ path: '/' })
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.post {
  padding: 0 1.5em 2.5em;

  @media (min-width: 600px) {
    padding: 0 2.5em 2.5em;
  }

  &-detail {
    &-meta {
      align-items: center;
      display: flex;
      font-size: 11px;
      justify-content: space-between;
      padding: 1em 0;
    }

    &-comments {
    }

    &-author {
    }

    &-image {
      img {
        height: auto;
        width: 100%;
      }
    }
  }
}

.back-btn {
  @media (min-width: 600px) {
    display: none;
  }

  img {
    width: 20px;
  }
}

.post-detail-nav {
  margin-bottom: 1rem;
  text-align: left;
}
</style>
