<template>
  <div>
    <div class="card mt-3" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="todo.completed"
            @change="toggleTodo(todo)"
          />
          <label
            class="form-check-label"
            :class="{ todo: todo.completed ? 'todo' : '' }"
          >
            {{ todo.subject }}
          </label>
        </div>

        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };

    const deleteTodo = (todo) => {
      emit("delete-todo", todo);
    };

    return {
      deleteTodo,
      toggleTodo,
    };
  },
};
</script>

<style scoped>
.todo {
  color: darkorange;
  text-decoration: line-through;
}
</style>
