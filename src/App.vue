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
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li> -->
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          검색
        </button>
      </form> -->
    </div>
  </nav>

  <div class="container">
    <router-view />
  </div>

  <Toast 
    v-if="showToast" :message="toastMessage" :type="toastAllertType"
  
   />
</template>


<script>
import Toast from "@/components/Toast.vue";
import { useToast } from "@/composables/toast";
import {useStore} from "vuex";

export default {

  created(){
    this.$store.commit("UPDATE_TOAST_STATUS", );
    this.$store.commit("UDATE_MESSAGE", "kossie");
  },

  components: {
    Toast,
  },
  setup() {
    const store =useStore();
    console.log(store.state.showToast);

    const { 
      toastMessage,
      toastAllertType, 
      showToast, 
      triggerToast 
    } =useToast();
     
    console.log(showToast.value);

     return{
           toastMessage,
          toastAllertType, 
          showToast, 
          triggerToast 
     }
  },
};
</script>

<style scoped>
</style>