<template>
  <div class="container">
    <h2>To-Do List</h2>

    <input
      type="text"
      class="form-control mt-5 mb-5"
      v-model="searchText"
      placeholder="Search"
    />

    <div style="color: red" class="mb-3">
      {{ error }}
    </div>

    <TodoSimpleForm :todos="todos" @add-todo="addTodo" class="mb-5" />

    <div v-if="!filteredTodos.length">검색 결과가 없습니다.</div>

    <TodoList
      :todos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />

    <hr />

    <div class="mt-3">
      <nav aria-label="Page navigation example ">
        <ul class="pagination" style="justify-content: center">
          <li v-if="currentPage !== 1" class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          <li
            v-for="page in numberOfPages"
            :key="page"
            class="page-item"
            :class="currentPage === page ? 'active' : ''"
          >
            <a class="page-link" href="#">{{ page }}</a>
          </li>

          <li v-if="numberOfPages !== currentPage" class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    {{ currentPage }}
  </div>
</template>


<script>
import { ref, computed } from "vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const error = ref("");
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(7);

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const getTodos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/todos/?_sort=id&_order=desc&_page=${currentPage.value}&_limit=${limit}`
        );

        numberOfTodos.value = parseInt(res.headers["x-total-count"]);

        console.log("totalPage : " + numberOfTodos.value);

        todos.value = res.data;
      } catch (err) {
        error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    getTodos();

    const addTodo = (todo) => {
      //데이터베이스 todo 를 저장
      error.value = "";
      console.log("start");

      axios
        .post("http://localhost:3000/todos/", {
          subject: todo.subject,
          completed: todo.completed,
        })
        .then((res) => {
          console.log(res);

          //todos.value.push(res.data);
          getTodos();
        })
        .catch((err) => {
          console.log(err);
          error.value = "데이트를 가져오는데 문제가 발생했습니다.";
        });

      console.log("hello");
    };

    const deleteTodo = async (index) => {
      error.value = "";
      const id = todos.value[index].id;
      try {
        const res = await axios.delete("http://localhost:3000/todos/" + id);
        console.log(res);
        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    const toggleTodo = async ({ id, completed }) => {
      error.value = "";
      console.log(id, completed);
      try {
        const res = await axios.patch("http://localhost:3000/todos/" + id, {
          completed: completed,
        });

        console.log(res);
      } catch (err) {
        console.log(err);
        error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    const searchText = ref("");
    const filteredTodos = computed(() => {
      if (searchText.value) {
        //console.log("1");
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      //console.log("2");
      return todos.value;
    });

    return {
      todos,
      addTodo,
      deleteTodo,
      searchText,
      filteredTodos,
      error,
      toggleTodo,
      numberOfPages,
      currentPage,
    };
  },
};
</script>

<style scoped>
.blue {
  color: blue;
}
</style>