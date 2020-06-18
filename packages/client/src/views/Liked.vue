<template>
  <div class="liked">
    <h2>Liked Posts</h2>

    <div v-for="post in posts" :posts="posts" :key="post.id">
      <img :src="post.thumbnail" alt="post.title" />
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
  created() {
    this.$data.posts = eventBus.favorite
  },
}
</script>

<style scoped>
.home {
  padding: 0 2.5em 2.5em;
}
</style>
