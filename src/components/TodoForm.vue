<template>
  <div>
    <div v-if="loading">loading...</div>
    <form v-else @submit.prevent="onSave">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label>제목</label>
            <input type="text" class="form-control" v-model="todo.subject" />

            <div v-if="subjectError" class="m-3">
              <span class="alert alert-danger text-red">
                {{ subjectError }}</span
              >
            </div>
          </div>
        </div>

        <div v-if="editing" class="col-6">
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

        <div class="col-12">
          <div class="form-group">
            <label>Body</label>
            <div>
              <textarea
                v-model="todo.body"
                class="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-info" :disabled="!todoUpdated">
        {{ editing ? "수정" : "저장" }}
      </button>
      <button type="button" class="btn btn-dark ml-2" @click="moveTodoListpage">
        취소
      </button>
    </form>

    <transition name="fade">
      <Toast v-if="showToast" :message="toastMessage" :type="toastAllertType" />
    </transition>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import _ from "lodash";
import Toast from "@/components/Toast.vue";

import { useToast } from "@/composables/toast";

export default {
  components: {
    Toast,
  },

  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const subjectError = ref("");
    const originalTodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;

    const { toastMessage, toastAllertType, showToast, triggerToast } =
      useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get("http://localhost:3000/todos/" + todoId);
        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        triggerToast("Something went worng", "danger");
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    if (props.editing) {
      getTodo();
    }

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveTodoListpage = () => {
      router.push({
        name: "Todos",
      });
    };

    const onSave = async () => {
      subjectError.value = "";
      if (!todo.value.subject) {
        subjectError.value = "Subject id required";
        return;
      } else {
        subjectError.value = "";
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };

        if (props.editing) {
          res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post(`http://localhost:3000/todos/`, data);
          todo.value.subject = "";
          todo.value.body = "";
        }

        const message =
          "Successfully " + (props.editing ? "Updated" : "Created");
        triggerToast(message);
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
      subjectError,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-form,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>