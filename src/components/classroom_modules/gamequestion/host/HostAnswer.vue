<template>
  <div>
    <div class="text-center">
      <p class="">Question</p>
      <p class="title">
        {{ data.question }}
      </p>
    </div>
    <div class="text-center">
      <p>ผู้ตอบ</p>
      <p>{{ data.student.first_name }} {{ data.student.last_name }}</p>
    </div>

    <div>
      <v-btn large color="green" class="white--text" @click="on_click(true)">
        Correct
      </v-btn>
      <v-btn large color="red" class="white--text" @click="on_click(false)">
        InCorrect
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "HostAnswer",
  props: {
    data: {
      type: [Object],
      require: true
    },
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