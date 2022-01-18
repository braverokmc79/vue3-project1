<template>
  <div class="alert toast-box" :class="`alert-${type}`">
    <strong>{{ message }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success",
    },
  },
};
</script>

<style scoped>
.toast-box {
  position: fixed;
  top: 50px;
  right: 10px;
}
</style>