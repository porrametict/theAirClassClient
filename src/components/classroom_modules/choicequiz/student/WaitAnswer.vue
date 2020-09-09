<template>
  <div class="text-center">
    <div>
      <p>count responder</p>
      <p class="title">
        {{data.count_current_question_responders}}
      </p>
    </div>
    <p class="headline">Please wait..</p>
  </div>
</template>

<script>
export default {
  name: "WaitAnswer",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
}
</script>

<style scoped>

</style>