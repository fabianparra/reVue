<template>
  <div class="home">
    <h2>Hello Welcome to the reVue app!</h2>
    <p>
      This is a Vue.js application with Apollo GraphQL client. It displays posts
      from the /top feed on Reddit's API.
    </p>
    <p>
      The API has been wrapped in a GraphQL server so it uses real GraphQL
      requests (queries and mutations).
    </p>
    <p>Please select the post you want to view at the left sidebar.</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  padding: 0 2.5em 2.5em;
}
</style>
