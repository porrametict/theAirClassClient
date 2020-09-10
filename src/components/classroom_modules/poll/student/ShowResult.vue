<template>
  <div>
    <p class="ma-0">Question</p>
    <div class="title">
      {{ data.question.text }}
    </div>
    <v-divider></v-divider>
    <div v-for="(choice) in data.question.choice_set" :key="choice.id" class="title">
      {{ choice.text }} : {{ choice.count_select }}
    </div>
    <div>
      <v-btn @click="on_change" color="grey" class="white--text" block>Close</v-btn>
    </div>
  </div>

</template>

<script>
export default {
  name: "ShowResult",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods: {
    on_change() {
      this.$emit('change', {'event': 'close_poll', 'data': null})
    }
  }
}
</script>

<style scoped>

</style>