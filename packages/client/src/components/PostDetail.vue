<template>
  <div class="post">
    <h1>{{ post.title }}</h1>
    <img
      v-if="post.image"
      class="post-image"
      :src="post.image"
      :alt="post.title"
    />
    <div>{{ post.num_comments }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import gql from 'graphql-tag'

const PostQuery = gql`
  query postQuery {
    post(id: $id) {
      id
      title
      image
      num_comments
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
})
export default class App extends Vue {}
</script>

<style lang="scss">
.post-image {
  height: auto;
  width: 100%;
}
</style>
