<template>
  <div>
    <p>Question</p>
    <p>
      {{ data.question }}
    </p>
    <div>
      <v-btn>next </v-btn>
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
