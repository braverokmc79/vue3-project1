<template>
  <div>
    <form class="d-flex" @submit.prevent="onSubmit">
      <div class="flex-grow-1 mr-2">
        <input
          type="text"
          class="form-control"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>

      <div>
        <button class="btn btn-primary">Add</button>
      </div>
    </form>

    <div v-show="hasError" class="danger" style="color: red">
      This field cannot be empty
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    //todos,
  },
  emits: ["add-todo"],

  setup(props, { emit }) {
    const todo = ref("");
    const hasError = ref(false);
    const onSubmit = () => {
      //console.log(name.value);
      if (todo.value === "") {
        hasError.value = true;
      } else {
        emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        // todos.value.push({
        //   id: Date.now(),
        //   subject: todo.value,
        //   completed: false,
        // });

        todo.value = "";
        hasError.value = false;
      }
    };

    return {
      todo,
      onSubmit,
      hasError,
    };
  },
};
</script>

<style scoped>
</style>