<template>
  <div>
    <p class="ma-0">Question</p>
    <div class="title">
      {{ data.question.text }}
    </div>
    <v-divider></v-divider>
    <div v-for="(choice) in data.question.choice_set" :key="choice.id" class="">
      {{ choice.text }}
      <PercentageProgressBar :key="choice.id" :numerator="choice.count_select"
                             :population="data.count_all_reply"></PercentageProgressBar>
    </div>
    <div class="my-1">
      <v-btn @click="on_change" color="grey" class="white--text" block>End</v-btn>
    </div>

  </div>
</template>

<script>
import PercentageProgressBar from "@/components/share/PercentageProgressBar";

export default {
  name: "HostShowQuestion",
  components: {PercentageProgressBar},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods: {
    on_change() {
      this.$emit('change', {'event': 'end_question', 'data': null})
    }
  }
}
</script>

<style scoped>

</style>