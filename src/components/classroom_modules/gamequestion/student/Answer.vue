<template>
  <div>
    <div class="text-center">
      <p class="">Question</p>
      <p class="title">
        {{ data.question }}
      </p>
    </div>
    <div class="text-center" v-if="data.student.pk != this.user.pk">
      <p>ผู้ตอบ</p>
      <p class="title">{{ data.student.first_name }} {{ data.student.last_name }}</p>
    </div>

    <div class="text-center" v-else>
      <p class="title">คุณคือผู้ตอบ</p>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Answer",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    on_click(e) {
      this.$emit('change', {'event': 'get_answer', data: {'result': e}})
    }
  }
}
</script>

<style scoped>

</style>