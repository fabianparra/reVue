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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PostCard from '@/components/PostCard.vue'
import { Post } from '@revue/graphql'

@Component({
  components: {
    PostCard,
  },
})
export default class PostList extends Vue {
  @Prop() private posts!: Post[]
  @Prop() private loading!: boolean
}
</script>
