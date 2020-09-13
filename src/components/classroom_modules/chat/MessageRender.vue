<template>

  <!-- if Me-->
  <div v-if="user.pk === data.user.pk" class="d-flex ml-auto">
    <v-card class="my-1 mx-2" outlined>
      <v-card-text class="primary">
        <p class="ma-0 pa-0">{{ data.message }}</p>
        <ImageMessage :data="data"></ImageMessage>
        <p class="caption ma-0 pa-0 text-end">{{ getTimeFormat(data.timestamp) }}</p>
      </v-card-text>
    </v-card>
  </div>
  <!-- if Other-->
  <div class="d-flex mr-auto " v-else>
    <div class="d-flex flex-row align-center">
      <ImageProfile :user="data.user"
                    :circle="true"
                    width="40"
                    height="40"
                    font_size_class="title"
      ></ImageProfile>
      <v-card outlined class="my-1 mx-2">
        <v-card-text class="grey lighten-2">
          <p class=" ma-0 pa-0">{{ data.message }}</p>
          <ImageMessage :data="data"></ImageMessage>
          <p class="caption ma-0 pa-0  ">{{ getTimeFormat(data.timestamp) }}</p>
        </v-card-text>
      </v-card>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import ImageProfile from "../../core/user/ImageProfile";
import moment from 'moment'
import ImageMessage from "./ImageMessage";


export default {
  name: "MessageRender",
  components: {ImageMessage, ImageProfile},
  props: {
    data: {
      type: Object
    }
  },
  async mounted() {
    if (!this.user) {
      await this.$store.dispatch('user/getUser')
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    getTimeFormat(time) {
      return moment(time).format('LT')
    }
  },
}
</script>

<style scoped>

</style>