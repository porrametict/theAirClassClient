<template>
  <div>
    <h1>Create Question</h1>
    <v-text-field
        v-model="question"
    >
    </v-text-field>

    <v-btn
        @click="on_click"
        color="primary"
        rounded
    >
      next
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "HostStart",
  data() {
    return {
      question: null
    }
  },
  methods: {
    on_click() {
      this.$emit('change', {'event': 'new_question', 'data': this.question})
    }
  }
}
</script>

<style scoped>

</style>