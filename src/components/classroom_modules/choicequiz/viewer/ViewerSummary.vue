<template>
  <div>

    <div v-if="student_scores.length">
      <v-card v-for="(item,index) in student_scores" :key="index" class="ma-1">
        <v-card-text class="text-center">
          <div v-if="index===0">
            <div>
              <v-icon large color="primary" v-if="item.point !==0">mdi-crown</v-icon>
            </div>
            <p class="ma-0 pa-0 ">
              {{ item.user_data.first_name }} {{ item.user_data.last_name }} <br/> {{ item.point }} points
            </p>
          </div>
          <div v-else-if="index===1">
            <div>
              <v-icon large color="blue" v-if="item.point !==0">mdi-chess-queen</v-icon>
            </div>
            <p class="ma-0 pa-0 ">
              {{ item.user_data.first_name }} {{ item.user_data.last_name }} <br/> {{ item.point }} points
            </p>
          </div>
          <div v-else-if="index===2">
            <div>
              <v-icon large color="black" v-if="item.point !==0">mdi-sword-cross</v-icon>
            </div>
            <p class="ma-0 pa-0 ">
              {{ item.user_data.first_name }} {{ item.user_data.last_name }} <br/> {{ item.point }} points
            </p>
          </div>
          <div v-else>
            <p class="ma-0 pa-0">
              {{ item.user_data.first_name }} {{ item.user_data.last_name }} <br/> {{ item.point }} points
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
  name: "ViewerSummary",
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
      this.student_scores = this.data.all_students
      _.sortBy(this.student_scores, ['point'])
      // this.student_scores.reverse()
    },

    on_click() {
      this.$emit('change', {'event': 'end_choice_quiz'})
    },


  }
}
</script>

<style scoped>

</style>