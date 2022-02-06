<template>
  <div>
    <h1>Home Page</h1>

    <div>{{count}}</div>

    <button
     @click="count++"
    >Add</button>


  </div>
</template>

<script>
import {useCount} from '@/composables/count.js';
export default {

  setup(){

    
    const {count} =useCount();
    console.log(count);

    return{
      count
    }
  }
};
</script>

<style scoped>
</style>