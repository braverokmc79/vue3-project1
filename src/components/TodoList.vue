<template>
  <div>
    <!-- <div class="card mt-3" v-for="todo in todos" :key="todo.id"> -->
    <List :items="todos">
     
     <template #default="{item, index}">
      <div
        class="card-body p-2 d-flex align-items-center"
        @click="moveTopage(item.id)"
      >
        <div class="flex-grow-1">
          {{index}}
          <input
            class="ml-2 mr-2"
            type="checkbox"
            v-model="item.completed"
            @change="toggleTodo(item)"
            @click.stop
          />
          <span :class="{ todo: item.completed ? 'todo' : '' }">
            {{ item.subject }}
          </span>
        </div>

        <div>
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    
     </template>
    </List>
    <!-- </div> -->
  </div>

  <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </teleport>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
//import Modal from "@/components/Modal.vue";
import Modal from "@/components/DeleteModal.vue";
import List from "@/components/List.vue";
export default {
  components: {
    Modal,
    List
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeletedId = ref(null);
    const toggleTodo = (todo) => {
      emit("toggle-todo", todo);
    };

    const openModal = (id) => {
      console.log("아이디 값 :" + id);
      todoDeletedId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeletedId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit("delete-todo", todoDeletedId.value);
      showModal.value = false;
      todoDeletedId.value = null;
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
      showModal,
      openModal,
      closeModal,
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
