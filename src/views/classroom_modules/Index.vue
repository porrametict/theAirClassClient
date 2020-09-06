<template>
  <div>
    <ContentHeader text="App" icon="mdi-view-dashboard"></ContentHeader>
    <!--  Content   -->
    <div class="d-flex justify-center">

      <div class="ma-5" v-for="(c,index) in c_modules" :key="index">
        <v-card width="300" @click="router_push(`${c.module.name}Index`,c.id)">
          <v-card-title class="d-flex flex-column">
            <v-icon large>{{ c.module.icon }}</v-icon>
            <p class="title mt-3">{{ c.module.label }}</p>
          </v-card-title>
        </v-card>
      </div>
    </div>


    <!-- Mock up  -->
    <v-btn @click="router_push('ChoiceQuizIndex')">
      go to Choice Quiz
    </v-btn>


  </div>
</template>

<script>
import ContentHeader from "../../components/share/ContentHeader";

export default {
  name: "ClassroomModuleIndex",
  components: {ContentHeader},
  data() {
    return {
      // form_params: {
      //     classroom__id: null
      // },
      c_modules: null
    }
  },
  created() {
    // this.loadData()
  },
  methods: {
    // async loadData() {
    //     this.form_params.classroom__id = this.$route.params.id
    //     let data = await this.$store.dispatch('classroom_modules/classroom_module/getListClassroomModule', this.form_params)
    //     this.c_modules = data.results
    // },
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