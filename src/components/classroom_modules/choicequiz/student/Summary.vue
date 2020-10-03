<template>
  <div>
    <div v-if="student_scores.length">
      <v-card v-for="(item,index) in student_scores" :key="index" class="ma-1">
        <v-card-text :class="isMe(item.user) ? 'green--text' : 'grey--text'" class="text-center">
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
  name: "Summary",
  components: {ButtonPrimary},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.sortResult()
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  data() {
    return {
      student_scores: [],
      rank_score: [0, 0, 0]

    }
  },
  methods: {
    isMe(user_id) {
      return user_id === this.user.pk;
    },
    sortResult() {
      // sort descending
      this.data.all_students.sort(function (a, b) {
        if (a['point'] < b['point']) {
          return 1;
        } else if (a['point'] === b['point']) {
          return 0;
        } else {
          return -1;
        }
      })
      this.student_scores = this.data.all_students


      this.student_scores.forEach(e => {
        this.rank_score.push(e['point'])
      })
      this.rank_score = this.sort_unique_score(this.rank_score)
    },
    sort_unique_score(arr) {
      if (arr.length === 0) return arr;
      arr = arr.sort(function (a, b) {
        if (a < b) {
          return 1;
        } else if (a === b) {
          return 0;
        } else {
          return -1;
        }
      });
      let ret = [arr[0]];
      for (let i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
        if (arr[i - 1] !== arr[i]) {
          ret.push(arr[i]);
        }
      }
      return ret;
    },
    on_click() {
      this.$emit('change', {'event': 'end_choice_quiz'})
    },


  }
}
</script>

<style scoped>

</style>