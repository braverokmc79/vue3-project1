<template>
  <div>
    <h1>To-Do Page</h1>
    <div v-if="loading">loading...</div>
    <form v-else>
      <div class="form-group">
        <label>제목</label>
        <input type="text" class="form-control" v-model="todo.subject" />
      </div>
      <button class="btn btn-dark">저장</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      const res = await axios.get(
        "http://localhost:3000/todos/" + route.params.id
      );
      todo.value = res.data;
      loading.value = false;
    };

    getTodo();

    return {
      todo,
      loading,
    };
  },
};
</script>

<style scoped>
</style>