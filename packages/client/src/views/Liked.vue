<template>
  <div class="liked">
    <div class="post-detail-nav">
      <a class="back-btn" @click="showSidebar">
        <img src="../assets/left-angle.svg" />
      </a>
    </div>
    <h2>Liked Posts</h2>

    <div class="posts-thumbnail-gallery">
      <div
        class="post-thumbnail-item"
        v-for="post in posts"
        :posts="posts"
        :key="post.id"
      >
        <img :src="post.thumbnail" alt="post.title" />
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main'
export default {
  name: 'Liked',
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    showSidebar() {
      eventBus.handleSidebar('open')
    },
  },
  created() {
    this.$data.posts = eventBus.favorite
  },
}
</script>

<style scoped lang="scss">
.home {
  padding: 0 2.5em 2.5em;
}

.posts-thumbnail-gallery {
  display: flex;
  flex-wrap: wrap;
}

.post-thumbnail-item {
  flex: 0 0 33.333%;

  img {
    // object-fit: cover;
    max-width: 100%;
  }
}
</style>
