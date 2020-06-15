<template>
  <div @click="handleClick(post)" class="post-card">
    <img v-if="post.thumbnail !== 'default'" :src="post.thumbnail" />
    <p>{{ post.title }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Post {
  id: string
  author: string
  cursor: string
  created: number
  image: string
  num_comments: number
  thumbnail: string
  title: string
}

@Component({
  methods: {
    handleClick(post: Post) {
      const path = `/post/${post.id}`
      if (this.$route.path !== path) this.$router.push({ path })
    },
  },
})
export default class PostCard extends Vue {
  @Prop() private post!: Post
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  // display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.post-card {
  border-bottom: 1px solid #f7f7f7;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 5px;
  display: flex;
}
</style>
