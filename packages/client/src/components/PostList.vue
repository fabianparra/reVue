<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'

export default {
  props: {
    posts: Array,
    loading: Boolean,
  },
  components: {
    PostCard,
  },
}
</script>
