<template>
  <div class="text-center">
    <div v-if="is_true === true">
      <p class="headline green--text">Correct</p>
      <v-icon class="display-4" color="green">
        mdi-emoticon-cool
      </v-icon>
    </div>
    <div v-else-if="is_true === false">
      <p class="headline red--text">Incorrect</p>
      <v-icon class="display-4" color="red">
        mdi-emoticon-dead
      </v-icon>
    </div>
    <div v-else-if="is_reply !== true">
      <p class="headline grey--text">Did not answer</p>
      <v-icon class="display-4" color="grey">
        mdi-emoticon-neutral
      </v-icon>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "AnswerResult",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.getResult()
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  data() {
    return {
      is_true: null,
      is_reply: null,

    }
  },
  methods: {
    getResult() {
      let current_question_index = this.data.current_question_index
      this.data.question_replies[current_question_index].students.forEach(e => {
        if (e.student === this.user.pk) {
          this.is_true = e.is_true
          this.is_reply = e.is_reply
        }
      })
    },

  }
}
</script>

<style scoped>

</style>