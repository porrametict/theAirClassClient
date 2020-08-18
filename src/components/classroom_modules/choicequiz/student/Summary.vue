<template>
  <div>
    <div v-if="student_scores.length">
      <v-card v-for="(item,index) in student_scores" :key="index" class="ma-1">
        <v-card-text :class="isMe(item.user) ? 'green--text' : 'grey--text'" class="text-center">
          <div v-if="index===0">
            <div>
              <v-icon large color="primary">mdi-crown</v-icon>
            </div>
            <p class="ma-0 pa-0 ">
              {{ item.user.first_name }} {{ item.user.last_name }} <br/> {{ item.score }} points
            </p>
          </div>
          <div v-else-if="index===1">
            <div>
              <v-icon large color="blue">mdi-chess-queen</v-icon>
            </div>
            <p class="ma-0 pa-0 ">
              {{ item.user.first_name }} {{ item.user.last_name }} <br/> {{ item.score }} points
            </p>
          </div>
          <div v-else-if="index===2">
            <div>
              <v-icon large color="black">mdi-sword-cross</v-icon>
            </div>
            <p class="ma-0 pa-0 ">
              {{ item.user.first_name }} {{ item.user.last_name }} <br/> {{ item.score }} points
            </p>
          </div>
          <div v-else>
            <p class="ma-0 pa-0">
              {{ item.user.first_name }} {{ item.user.last_name }} <br/> {{ item.score }} points
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-card class="text-center ma-1" v-else>
      <v-card-text class="title">
        No one scored
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
    isMe(user) {
      return user.pk === this.user.pk;
    },
    getResult() {
      this.data.choice_students.forEach((o) => {
        if (o.question.id === this.data.choice_quiz.question_set[this.data.current_question_index].id) {  //question == current_question

          o.choice_selects.forEach((c) => {

            o.question.choice_set.forEach((cs) => {

              let answer_true = false

              if (c.choice_select === cs.id) { //is selected choice true
                answer_true = true
              }
              if (answer_true) {
                if (this.userInlist(c.user)) {
                  this.add_point(c.user, o.question.score)
                } else {
                  this.student_scores.push({user: c.user, score: o.question.score})
                }
              }
            })

          })
          this.count_answer = o.choice_selects.length
        }
      })
    },
    userInlist(user) {
      let is_have = false
      this.student_scores.forEach((item) => {
        if (item.user.pk === user.pk) {
          is_have = true
        }
      })
      return is_have
    },
    add_point(user, point) {
      if (this.student_scores.length) {
        if (this.userInlist(user)) {
          for (let i = 0; i < this.student_scores.length; i++) {
            let item = this.student_scores[i]
            if (item.user.pk === user.pk) {
              item.score += point
            }
          }
        } else {
          this.student_scores.push({user: user, score: point})
        }
      } else {
        this.student_scores.push({user: user, score: point})
      }

    },
    on_click() {
      this.$emit('change', {'event': 'end_choice_quiz'})
    },


  }
}
</script>

<style scoped>

</style>