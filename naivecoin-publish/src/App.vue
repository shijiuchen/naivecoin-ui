<template>
  <div id="app">
    <div class="container"><h1><a class="header-link" href="/">IR-DCP Task Publish Wallet</a></h1>
      <router-view :key="$route.fullPath"/></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created()
  {

  },
}
</script>

<style>
.header-link {
  color: black;
  text-decoration: none; /* no underline */
  text-align: center;
}

.break-word {
  word-wrap: break-word;
}
</style>
