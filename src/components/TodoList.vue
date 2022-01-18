<template>
  <div>
    <div class="card mt-3" v-for="(todo, index) in todos" :key="todo.id">
      <div
        class="card-body p-2 d-flex align-items-center"
        @click="moveTopage(todo.id)"
      >
        <div class="form-check flex-grow-1">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="todo.completed"
            @change="toggleTodo(todo)"
            @click.stop
          />
          <label
            class="form-check-label"
            :class="{ todo: todo.completed ? 'todo' : '' }"
          >
            {{ todo.subject }}
          </label>
        </div>

        <div>
          <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();

    const toggleTodo = (todo) => {
      emit("toggle-todo", todo);
    };

    const deleteTodo = (todo) => {
      emit("delete-todo", todo);
    };

    const moveTopage = (todoId) => {
      console.log(todoId);
      // router.push("/todos/" + todoId);
      router.push("/");

      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };

    return {
      deleteTodo,
      toggleTodo,
      moveTopage,
    };
  },
};
</script>

<style scoped>
.todo {
  color: darkorange;
  text-decoration: line-through;
}
.card-body {
  cursor: pointer;
}
</style>
