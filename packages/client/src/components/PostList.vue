<template>
  <div>
    <div class="post-list">
      <transition-group name="slide" mode="out-in" appear="">
        <div class="post-card-main" v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </transition-group>

      <div v-if="loading">
        <img src="../assets/revue-loader.gif" alt="loader" />
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

<style scoped lang="scss">
.post-card-main {
  max-width: 100%;
  width: 96%;

  @media (min-width: 600px) {
    max-width: 380px;
  }
}
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 0.7s ease-out forwards;
  transition: opacity 0.7s;
}
.slide-leave {
  opacity: 1;
  transition: all 0.7s;
  //width: 100%;
}
.slide-leave-active {
  animation: slide-out 0.7s ease-out forwards;
  transition: opacity 0.7s;
  opacity: 0;
  position: absolute;
  //width: 0;
}

.slide-move {
  transition: transform 0.7s;
}

@keyframes slide-in {
  from {
    transform: translateX(-100px);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-100px);
  }
}
</style>
