<template>
  <div>
    <p class="headline">
      {{ question.text }}
    </p>
    <div>


      <div class="ma-1">
        <v-hover
            v-slot:default="{ hover }"
        >
          <v-card
              :color="hover? 'primary' : 'white'"
              style="cursor: pointer"
              @click="on_select(true)"
          >
            <v-card-text class="pa-2 ma-0  d-flex justify-center align-center">
              <p class="title text-center ma-0 pa-0">
                Yes
              </p>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>

      <div class="ma-1">
        <v-hover
            v-slot:default="{ hover }"
        >
          <v-card
              :color="hover? 'primary' : 'white'"
              style="cursor: pointer"
              @click="on_select(false)"
          >
            <v-card-text class="pa-2 ma-0  d-flex justify-center align-center">
              <p class="title text-center ma-0 pa-0">
                No
              </p>
            </v-card-text>
          </v-card>
        </v-hover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YesNoQuestionShow",
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