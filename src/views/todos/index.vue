<template>
  <div style="opacity: 1">
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button type="button" class="btn btn-primary" @click="moveToCreatePage">
        Create Todo
      </button>
    </div>

    <input
      type="text"
      class="form-control mt-5 mb-5"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    />

    <div style="color: red" class="mb-3">
      {{ error }}
    </div>

    <h6>게시글 수 : {{ numberOfTodos }}</h6>

    <div v-if="!todos.length">검색 결과가 없습니다.</div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />

    <hr />

    <div class="mt-3">
 
      
      <Pagination 
        v-if="todos.length"
        :numberOfPages="numberOfPages"  
        :currentPage="currentPage"
        :list="list"
        @click="getTodos"  
        
      />



    </div>
  </div>
</template>


<script>
import { ref, computed, watch } from "vue";
import TodoList from "@/components/TodoList.vue";
import axios from "@/axios";
import { useToast } from "@/composables/toast";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";


export default {
  components: {
    TodoList,
    Pagination
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref("");
    const numberOfTodos = ref(0); //전체 게시글 갯수
    const limit = 5; //한페이지에 보여줄 목록 갯수
    const currentPage = ref(1); //현재 페이지
    const block = 5; // 페이지 block 에 표시할 갯수
    let first = null; // 첫번째 페이지번호
    let end = null; // 마지막 페이지 번호
    let list = ref([]); // 페이지 block 에 표시할 번호들
    const searchText = ref("");

    const { toastMessage, toastAllertType, showToast, triggerToast } =
      useToast();

    let timeout = null;
    const searchTodo = () => {
      getTodos(1);
    };

    const moveToCreatePage = () => {
      console.log("tes");
      router.push({
        name: "TodoCreate",
      });
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(searchText.value);
        getTodos(1);
      }, 2000);
    });

    // watch([currentPage, numberOfTodos], (currentPage, prev) => {
    //   console.log(currentPage, prev);
    // });

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const pageDataSetting = ({ total, limit, block, page }) => {
      const totalPage = Math.ceil(total / limit);
      let currentPage = page;
      const first =
        currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null;
      const end =
        totalPage !== currentPage
          ? parseInt(currentPage, 10) + parseInt(1, 10)
          : null;

      let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1;
      let endIndex =
        startIndex + block > totalPage ? totalPage : startIndex + block - 1;
      let list = [];
      for (let index = startIndex; index <= endIndex; index++) {
        list.push(index);
      }
      return { first, end, list, currentPage };
    };

    const getTodos = async (page) => {
      if (page == undefined) page = 1;
      //console.log("page :" + page);

      try {
        await axios
          .get(
            `todos/?subject_like=${searchText.value}&_sort=id&_order=desc&_page=${page}&_limit=${limit}`
          )
          .then((res) => {
            //1.전체 게시글 갯수 가져오기
            numberOfTodos.value = parseInt(res.headers["x-total-count"]);

            //2. 현재 페이지
            currentPage.value = page;

            const pagetData = {
              total: numberOfTodos.value,
              limit: limit,
              block: block,
              page: page,
            };

            // console.log("pagetData : ");
            //  console.log(pagetData);

            //3.페이지 계산처리
            const pageCalceData = pageDataSetting(pagetData);
            //  console.log("pageCalceData : ");
            //  console.log(pageCalceData);

            first = pageCalceData.first;
            end = pageCalceData.end;
            list.value = pageCalceData.list;

            //console.log(list.value);

            //4.목록에 출력 데이터
            todos.value = res.data;
          });
      } catch (error) {
        triggerToast("데이트를 가져오는데 문제가 발생했습니다.", "danger");
        error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      //데이터베이스 todo 를 저장
      error.value = "";
      try {
        await axios.post("todos/", {
          subject: todo.subject,
          completed: todo.completed,
        });

        triggerToast("Successfully saved!!");
        getTodos(1);
      } catch (err) {
        //error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    const deleteTodo = async (id) => {
      error.value = "";

      try {
        await axios.delete("todos/" + id);
        getTodos(1);
      } catch (err) {
        triggerToast("데이트를 가져오는데 문제가 발생했습니다.", "danger");
        console.log(err);
        error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    const toggleTodo = async ({ id, completed }) => {
      error.value = "";
      console.log(id, completed);
      try {
        const res = await axios.patch("todos/" + id, {
          completed: completed,
        });

        console.log(res);
      } catch (err) {
        triggerToast("데이트를 가져오는데 문제가 발생했습니다.", "danger");
        console.log(err);
        error.value = "데이트를 가져오는데 문제가 발생했습니다.";
      }
    };

    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     //console.log("1");
    //     return todos.value.filter((todo) => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   //console.log("2");
    //   return todos.value;
    // });

    return {
      todos,
      addTodo,
      deleteTodo,
      searchText,
      // filteredTodos,
      error,
      toggleTodo,
      numberOfPages,
      currentPage,
      getTodos,
      block,
      pageDataSetting,
      first,
      end,
      list,
      numberOfTodos,
      searchTodo,

      showToast,
      toastMessage,
      toastAllertType,
      moveToCreatePage,
      
    };
  },
};
</script>

<style scoped>
.blue {
  color: blue;
}
.page-link {
  cursor: pointer;
}
</style>