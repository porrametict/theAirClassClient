<template>
  <router-view v-if="classroom"></router-view>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ClassroomTemplate",
  computed: {
    ...mapState({
      classroom: state => state.classroom.classroom,
    })
  },
  async mounted() {
    if (!this.classroom) {
      await this.$store.dispatch('classroom/retrieveClassroom', this.$route.params.id)
    }
  },
}
</script>

<style scoped>

</style>