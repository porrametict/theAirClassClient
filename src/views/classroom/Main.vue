<template>
  <div>
    <!--        classroom detail -->
    <ClassroomDetail :classroom="classroom" :show_edit_delete="user_role === 1 "></ClassroomDetail>
    <v-divider class="mt-2"></v-divider>
    <!--        content-->
    <div>
      <v-tabs v-model="activeTab" grow>
        <v-tab v-for="(tab,index) of tabs" :key="index" :to="{name : tab.route}" exact>
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <router-view v-if="classroom"></router-view>
    </div>
  </div>
</template>

<script>
import ClassroomDetail from "../../components/classroom/ClassroomDetail";
import {mapState} from "vuex";

export default {
  name: "ClassroomMain",
  components: {ClassroomDetail},
  computed: {
    ...mapState({
      classroom: state => state.classroom.classroom,
      user: state => state.user.user

    })
  },
  data() {
    return {
      activeTab: null,
      user_role: null,
      tabs: [
        {name: "Member", route: `MemberIndex`},
        {name: "Score", route: `ScoreIndex`},
        {name: "App", route: `ClassroomModuleIndex`},
      ]
    }
  },
  async mounted() {
    if (!this.classroom) {
      await this.$store.dispatch('classroom/retrieveClassroom', this.$route.params.id)
    }
    if (this.$route.name === 'MainClassroom') {
      this.router_push('MemberIndex')
    }
    await this.loadData()
    await this.checkUserRole()

  },
  methods: {
    async checkUserRole() {
      let data = await this.$store.dispatch('classroom/getListClassroomByUser', {
        'user__id': this.user.pk,
        'classroom_id': this.classroom.id
      })
      this.user_role = data.results[0]['role']
    },
    async loadData() {
      let id = this.$route.params.id
      await this.$store.dispatch('classroom/retrieveClassroom', id)
    },
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
