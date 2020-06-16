<template>
  <div @click="handleClick(post)" class="post-card">
    <img
      v-if="
        post.thumbnail !== 'default' &&
          post.thumbnail !== 'nsfw' &&
          post.thumbnail !== 'self'
      "
      :src="post.thumbnail"
    />
    <div>
      <p>{{ post.title }}</p>
      <p>{{ post.num_comments }}</p>
    </div>
    <button @click.stop="delPost(post)">del</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DeletePostDocument, PostsDocument, Post } from '@revue/graphql'

@Component({
  methods: {
    handleClick(post: Post) {
      const path = `/post/${post.id}`
      if (this.$route.path !== path) this.$router.push({ path })
    },
    delPost(post) {
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

          // Disabling write to prevent
          // store.writeQuery({
          //   query: PostsDocument,
          //   data,
          // })
        },
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   deletePost: {
        //     __typename: 'Post',
        //     id: post.id,
        //   },
        // },
      })
    },
  },
  // computed: {
  //   showImage(): boolean {
  //     return (
  //       this.post.thumbnail !== 'default' &&
  //       this.post.thumbnail !== 'nsfw' &&
  //       this.post.thumbnail !== 'self'
  //     )
  //   },
  // },
})
export default class PostCard extends Vue {
  @Prop() private post!: Post
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
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
