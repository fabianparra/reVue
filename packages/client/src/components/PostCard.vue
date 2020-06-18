<template>
  <div
    @click="
      handleClick(post)
      redPost(post)
    "
    class="post-card"
    :class="{ read: post.read, active: active }"
  >
    <div v-if="showImage" class="post-card-thumbnail">
      <img :src="post.thumbnail" />
    </div>
    <div class="post-card-txt">
      <p>{{ post.title }}</p>
      <p class="post-card-created">{{ postDate(post.created) }}</p>
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
      <a @click.stop="toggleLikePost(post)">
        <div v-if="showImage" class="post-menu-item">
          <div>
            <img src="../assets/star.svg" />
          </div>
          <div v-if="!like"><p>Like</p></div>
          <div v-else><p>Unike</p></div>
        </div>
      </a>
      <a @click.stop="delPost(post)">
        <div class="post-menu-item">
          <div>
            <img src="../assets/trash.svg" />
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
import { eventBus } from '../main'
import moment from 'moment'

const PostRead = gql`
  mutation PostRead($id: ID!) {
    postRead(id: $id)
  }
`

@Component({
  data: () => ({
    showMenu: false,
    active: false,
    like: false,
  }),
  methods: {
    handleClick(post: Post) {
      const path = `/post/${post.id}`
      if (this.$route.path !== path) this.$router.push({ path })

      // Active class TODO: clear active for siblings
      // this.$data.active = this.$route.path === path

      eventBus.handleSidebar('close')
    },
    delPost(post: Post) {
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
    redPost(post: Post) {
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
    toggleLikePost(post: Post) {
      // Get custom local favorite post collection
      const likedPosts = eventBus.$data.favorite

      // Verify if post exists in array otherwise add it
      if (likedPosts.find(p => p.id === post.id)) {
        const removeIndex = likedPosts
          .map((item: Post) => item.id)
          .indexOf(post.id)
        likedPosts.splice(removeIndex, 1)
        this.$data.like = false
      } else {
        likedPosts.push(post)
        this.$data.like = true
      }

      // Redirect to liked path
      if (this.$route.path !== '/liked') this.$router.push({ path: '/liked' })
      this.$data.showMenu = false
      eventBus.handleSidebar('close')
    },
    postDate(date: number): string {
      const parsedDate = moment.unix(date).format('DD MMM YYYY hh:mm a')
      const timeAgo = moment(parsedDate).fromNow()
      return timeAgo
    },
  },
  computed: {
    showImage(): boolean {
      return (
        this.$props.post.thumbnail !== 'default' &&
        this.$props.post.thumbnail !== 'nsfw' &&
        this.$props.post.thumbnail !== 'self' &&
        this.$props.post.thumbnail !== 'spoiler'
      )
    },
  },
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
  transition: transform 0.3s;

  &:hover {
    transform: translate(10px, 10x);
  }

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

  &-created {
    float: right;
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

  img {
    opacity: 0.6;
  }
}

.active {
  background-color: rgb(240, 242, 243);
}
</style>
