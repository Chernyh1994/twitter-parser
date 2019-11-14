<template>
  <div class="error-500">
    <h1 class="mdi mdi-loading mdi-spin" />
    <h2>Error 500.</h2>
    <p>Internal Server Error.</p>
  </div>
</template>

<script>
export default {
  name: "Error500",
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.error-500 {
  text-align: center;
}
</style>
