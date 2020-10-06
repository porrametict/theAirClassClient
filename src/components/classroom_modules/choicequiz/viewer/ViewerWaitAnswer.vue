<template>
  <div class="text-center">
    <div>
      <p>count responder</p>
      <p class="title">
        {{data.count_current_question_responders}}  /{{data.all_students.length}}
      </p>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from "@/components/share/ButtonPrimary";
export default {
  name: "ViewerWaitAnswer",
  components: {ButtonPrimary},
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