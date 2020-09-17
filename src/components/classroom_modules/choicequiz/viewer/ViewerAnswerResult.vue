<template>
  <div class="text-center">
    <div>
      <p class="headline green--text">Correct : {{ data.count_current_correct_responders }}</p>
    </div>
    <div>
      <p class="headline red--text">Incorrect : {{ data.count_current_incorrect_responders }}</p>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "ViewerAnswerResult",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },

  methods: {

    on_click(e) {
      this.$emit('change', {'event': e})
    }

  }
}
</script>

<style scoped>

</style>