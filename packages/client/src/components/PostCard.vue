<template>
  <div
    @click="
      handleClick(post)
      redPost(post)
    "
    class="post-card"
    :class="{ read: post.read }"
  >
    <div
      v-if="
        post.thumbnail !== 'default' &&
          post.thumbnail !== 'nsfw' &&
          post.thumbnail !== 'self'
      "
      class="post-card-thumbnail"
    >
      <img :src="post.thumbnail" />
    </div>
    <div class="post-card-txt">
      <p>{{ post.title }}</p>
      <p>{{ post.num_comments }}</p>
    </div>
    <a @click.stop="showMenu = !showMenu"
      ><span
        ><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            fill="#A2B1B3"
            fill-rule="evenodd"
          ></path></svg></span
      ><span></span>
    </a>
    <div v-show="showMenu" class="post-menu">
      <a @click.stop="likePost(post)">
        <div class="post-menu-item">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#A2B1B3"
                d="M11.762 16.74a.5.5 0 0 1 .476 0l4.205 2.274-.78-4.907a.5.5 0 0 1 .135-.427l3.415-3.511-4.722-.744a.5.5 0 0 1-.373-.278L12 4.732 9.882 9.147a.5.5 0 0 1-.373.278l-4.722.744 3.415 3.51a.5.5 0 0 1 .135.428l-.78 4.907 4.205-2.275zM12 17.746l-4.858 2.629a.5.5 0 0 1-.732-.519l.9-5.66-3.914-4.023a.5.5 0 0 1 .281-.843l5.417-.853 2.455-5.118a.5.5 0 0 1 .902 0l2.455 5.118 5.417.853a.5.5 0 0 1 .28.843l-3.913 4.024.9 5.66a.5.5 0 0 1-.732.518L12 17.747z"
              ></path>
            </svg>
          </div>
          <div><p>Like</p></div>
        </div>
      </a>
      <a @click.stop="delPost(post)">
        <div class="post-menu-item">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#A2B1B3"
                fill-rule="evenodd"
                d="M6.09 8H5V7h5V5h4v2h5v1h-1.09L16 19.5H8L6.09 8zM13 7V6h-2v1h2zM7.095 8l1.818 10.5h6.174L16.905 8h-9.81zM13 11.5h1v5h-1v-5zm-3 0h1v5h-1v-5z"
              ></path>
            </svg>
          </div>
          <div><p>Delete</p></div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Post, DeletePostDocument, PostsDocument } from '@revue/graphql'
import gql from 'graphql-tag'

const PostRead = gql`
  mutation PostRead($id: ID!) {
    postRead(id: $id)
  }
`

@Component({
  data: () => {
    return {
      showMenu: false,
    }
  },
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
    redPost(post) {
      this.$apollo.mutate({
        mutation: PostRead,
        variables: {
          id: post.id,
        },
        update: (store, { data: { postRead: id } }) => {
          const data: any = store.readQuery({
            query: PostsDocument,
            variables: {
              cursor: null,
              limit: 5,
              count: 5,
            },
          })

          const selectedItem = data.posts.find((post: Post) => {
            return post.id === id
          })

          selectedItem.read = true
        },
      })
    },
    likePost(post) {
      console.log('post', post)
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
  background-color: #fff;
  border: 1px solid rgb(240, 242, 243);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 1rem;
  position: relative;

  &-thumbnail {
    flex: 0 0 60px;
    width: 60px;

    img {
      height: auto;
      width: 100%;
    }
  }

  &-txt {
    font-size: 14px;
    text-align: left;
    margin-right: auto;
    padding: 0 1rem;

    p {
      margin-top: 0;
    }
  }
}

.post-menu {
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 8px 28px 0 rgba(9, 68, 75, 0.14);
  position: absolute;
  right: 1rem;
  top: 3rem;
  user-select: none;
  z-index: 10;

  &-item {
    align-items: center;
    color: rgb(25, 44, 51);
    display: flex;
    justify-content: space-evenly;
    min-width: 176px;
  }
}

.read {
  color: rgb(162, 177, 179) !important;
  //font-weight: normal;
}
</style>
