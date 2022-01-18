<template>
  <div>
    <h1>To-Do Page</h1>
    <div v-if="loading">loading...</div>
    <form v-else @submit.prevent="onSave">
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

      <button type="submit" class="btn btn-info" :disabled="!todoUpdated">
        저장
      </button>
      <button type="button" class="btn btn-dark ml-2" @click="moveTodoListpage">
        취소
      </button>
    </form>
    <Toast v-if="showToast" :message="toastMessage" :type="toastAllertType" />
  </div>

  <div id="kossie">code</div>
</template>

<script>
import { computed, ref, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import _ from "lodash";
import Toast from "@/components/Toast.vue";

export default {
  components: {
    Toast,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastAllertType = ref("");
    const timeout = ref("");
    onUnmounted(() => {
      console.log("onUnmounted ");
      // clearTimeout(timeout.value);
    });

    const getTodo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos/" + todoId);
        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        console.log(error);
        triggerToast("Something went worng", "danger");
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    getTodo();

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveTodoListpage = () => {
      router.push({
        name: "Todos",
      });
    };

    const triggerToast = (message, type = "success") => {
      toastMessage.value = message;
      toastAllertType.value = type;
      showToast.value = true;
      timeout.value = setTimeout(() => {
        toastMessage.value = "";
        toastAllertType.value = "";
        console.log("setTimeOut");
        showToast.value = false;
      }, 5000);
    };

    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });

        originalTodo.value = { ...res.data };

        triggerToast("Successfully saved!!");
      } catch (error) {
        console.log(error);
        triggerToast("Something went worng", "danger");
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveTodoListpage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAllertType,
      timeout,
    };
  },
};
</script>

<style scoped>
</style>