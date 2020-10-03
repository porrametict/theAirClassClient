<template>
  <div class="text-center">
    <div>
      <p>count responder</p>
      <p class="title">
        {{ data.count_current_question_responders }} /{{data.all_students.length}}
      </p>
    </div>
    <div>
      <ButtonPrimary @click="on_click">Answer</ButtonPrimary>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from "@/components/share/ButtonPrimary";

export default {
  name: "HostWaitAnswer",
  components: {ButtonPrimary},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods: {
    on_click() {
      this.$emit('change', {'event': 'answer'})
    },
  }
}
</script>

<style scoped>

</style>