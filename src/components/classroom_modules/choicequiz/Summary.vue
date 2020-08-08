<template>
  <div>
    <v-card v-for="(item,index) in student_scores" :key="index">
      <v-card-text class="text-center">
        <div v-if="index===0">

          <div >
            <v-icon large>mdi-crown</v-icon>
          </div>
          <p class="ma-0 pa-0 title">
            {{ item.user.first_name }} {{ item.user.last_name }}
          </p>
        </div>
        <div v-else>

          <p class="ma-0 pa-0 ">
            {{ item.user.first_name }} {{ item.user.last_name }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ButtonPrimary from "@/components/share/ButtonPrimary";

export default {
  name: "Summary",
  components: {ButtonPrimary},
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
      student_scores: [],
    }
  },
  methods: {
    getResult() {
      this.data.choice_students.forEach((o) => {
        if (o.question.id === this.data.choice_quiz.question_set[this.data.current_question_index].id) {  //question == current_question

          o.choice_selects.forEach((c) => {

            o.question.choice_set.forEach((cs) => {

              if (c.choice_select === cs.id) { //is selected choice true

                if (this.userInlist(c.user)) {
                  this.add_point(c.user, c.choice_select.score)
                } else {
                  this.student_scores.push({user: c.user, score: o.question.score})

                }
              } else {
                this.add_point(c.user, 0)
              }
            })

          })
          this.count_answer = o.choice_selects.length
        }
      })
    },
    userInlist(user) {
      let is_have = true
      this.student_scores.forEach((item) => {
        if (item.user.pk === user.pk) {
          is_have = true
          return 0;
        }
      })
      return is_have
    },
    add_point(user, point) {
      if (this.student_scores.length) {
        for (let i = 0; i < this.student_scores.length; i++) {
          let item = this.student_scores[i]
          if (item.user.pk === user.pk) {
            item.score += point
          }
        }
      } else {
        this.student_scores.push({user: user, score: point})
      }

    },
    on_click(e) {
      this.$emit('change', {'event': e})
    }

  }
}
</script>

<style scoped>

</style>