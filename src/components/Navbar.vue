<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <router-link class="navbar-brand" :to="{ name: 'Home' }"
      >Macaronics</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/todos"> Todos </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>