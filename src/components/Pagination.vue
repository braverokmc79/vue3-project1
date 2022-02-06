<template>
  <nav aria-label="Page navigation example ">
    <ul class="pagination" style="justify-content: center">
      <li v-if="currentPage !== 1" class="page-item">
        <a
          class="page-link"
          @click="onClick(currentPage - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        v-for="page in list"
        :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''"
      >
        <a class="page-link" @click="onClick(page)">{{ page }}</a>
      </li>

      <li
        v-if="numberOfPages !== 0 && numberOfPages !== currentPage"
        class="page-item"
      >
        <a
          class="page-link"
          @click="onClick(currentPage + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>


</template>

<script>

export default {

    props:{
        numberOfPages: {
            type:Number,
            required:true
        },
        currentPage:{
            type:Number,
            required:true
        }
        ,
        list:{
            type:[],
            required:true
        }
    },

    emits:['click'],
    setup(props, { emit }){

        const onClick=(page)=>{
            emit('click', page);
        };

        return{
            onClick,

        }
    }



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