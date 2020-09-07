<template>
  <div class="text-center">
    <p class="">Question</p>
    <p class="title">
      {{ data.question.text }}
    </p>
    <div>
      <v-btn @click="on_click" rounded block color="primary">next </v-btn>
    </div>
  </div>

</template>

<script>
export default {
  name: "HostShowQuestion",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods : {
    on_click() {
      this.$emit('change', {'event': 'show_question'})
    }
  }
}
</script>
