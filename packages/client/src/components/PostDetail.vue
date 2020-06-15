<template>
  <div class="post">
    <h1>{{ post.title }}</h1>
    <img :src="post.image" :alt="post.title" />
  </div>
</template>

<script>
export default {
  data: () => ({
    post: {},
  }),
}
</script>
