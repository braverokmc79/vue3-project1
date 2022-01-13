<template>
  <div>
    <h1>To-Do Page</h1>
    <div v-if="loading">loading...</div>
    <form v-else>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>제목</label>
            <input type="text" class="form-control" v-model="todo.subject" />
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label>상태</label>
            <div>
              <button
                type="button"
                class="btn"
                :class="todo.completed ? 'btn-success' : 'btn-danger'"
                @click.stop="toggleTodoStatus"
              >
                {{ todo.completed ? "Completed" : "Incompleted" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-info">저장</button>

      <button type="button" class="btn btn-dark ml-2" @click="moveTodoListpage">
        취소
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
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

    const toggleTodoStatus = () => {
      // const res = await axios.patch("http://localhost:3000/todos/" + id, {
      //   completed: !completed,
      // });
      // console.log(res);
      // router.push({
      //   name: "Todo",
      //   params: {
      //     id: id,
      //   },
      // });
      todo.value.completed = !todo.value.completed;
    };

    const moveTodoListpage = () => {
      router.push({
        name: "Todos",
      });
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveTodoListpage,
    };
  },
};
</script>

<style scoped>
</style>