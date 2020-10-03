<template>
  <div>
    <div class="text-center">
      <p class="">Question</p>
      <p class="title">
        {{ data.question.text }}
      </p>
    </div>
    <div class="text-center">
      <p>ผู้ตอบ</p>
      <p>{{ data.student.first_name }} {{ data.student.last_name }}</p>
    </div>

    <div>
      <v-btn large block color="green" class="white--text ma-1" @click="on_click(true)" :disabled="clicked">
        Correct
      </v-btn>
      <v-btn large block color="red" class="white--text ma-1" @click="on_click(false)"  :disabled="clicked">
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
  data (){
    return {
        clicked : false
    }
  },
  methods: {
    on_click(e) {
      this.clicked = true
      this.$emit('change', {'event': 'get_answer', data: {'result': e}})
    }
  }
}
</script>

<style scoped>

</style>