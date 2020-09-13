<template>
  <div>
    <ContentHeader text="App" icon="mdi-view-dashboard"></ContentHeader>
    <!--  Content   -->
    <div class="d-flex justify-center flex-wrap">

      <div class="ma-5" v-for="(c,index) in c_modules" :key="index">
        <v-card width="300" @click="router_push(`${c.route_name}`)">
          <v-card-title class="d-flex flex-column">
            <v-icon x-large class="display-4" :color="c.color">{{ c.icon }}</v-icon>
            <p class="title mt-3">{{ c.label }}</p>
          </v-card-title>
        </v-card>
      </div>
    </div>

  </div>
</template>

<script>
import ContentHeader from "../../components/share/ContentHeader";

export default {
  name: "ClassroomModuleIndex",
  components: {ContentHeader},
  data() {
    return {
      c_modules: [
        {
          label: "Attendance",
          route_name: "AttendanceIndex",
          icon: 'mdi-calendar-multiple-check',
          color: 'pink'
        },
        {
          label: "Choice Quiz",
          route_name: "ChoiceQuizIndex",
          icon: 'mdi-order-bool-ascending-variant',
          color: 'green'
        }, {
          label: "Game Question",
          route_name: "GameQuestionIndex",
          icon: 'mdi-gamepad-square',
          color: 'blue'
        }, {
          label: "Poll",
          route_name: "PollIndex",
          icon: 'mdi-poll',
          color: 'orange'
        },
      ]
    }
  },
  created() {
  },
  methods: {
    router_push(name) {
      if (this.$router.currentRoute.name !== name) {
        this.$router.replace({name: name}).catch((any) => {
          console.log(any)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>