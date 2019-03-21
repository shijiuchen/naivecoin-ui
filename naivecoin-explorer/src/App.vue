<template>
  <div id="app">
    <div class="container"><a class="header-link" href="/"></a>
      <router-view :key="$route.fullPath"/></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created()
  {

  }
}
</script>

<style>
.header-link {
  color: black;
  text-decoration: none; /* no underline */
}

.break-word {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
</style>
