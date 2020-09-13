<template>
  <div>
    <p class="headline">
      {{ question.text }}
    </p>

    <div class="ma-1"
         v-for="(item,index) in question.choice_set"
         :key="index"
    >
      <v-hover
          v-slot:default="{ hover }"
      >
        <v-card
            :color="hover? 'primary' : 'white'"
            style="cursor: pointer"
            @click="on_select(item)"
        >
          <v-card-text class="pa-2 ma-0  d-flex justify-center align-center">
            <p class="title text-center ma-0 pa-0">
              {{ item.text }}
            </p>
          </v-card-text>
        </v-card>
      </v-hover>
    </div>

  </div>
</template>

<script>
export default {
  name: "MultiChoiceQuestionShow",
  props: {
    question: {
      type: [Object],
      require: true
    },
  },
  methods: {
    on_select(item) {
      this.$emit('change', item)
    },

  }
}
</script>

<style scoped>

</style>