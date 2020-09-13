<template>
  <div>
    <v-progress-linear
        v-model="percent"
        :color="color"
        :height="height"
    >
      <template v-slot="{ value }">
        <strong>{{ Math.ceil(value) }}% ({{ numerator }})</strong>
      </template>
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "PercentageProgressBar",
  props: {
    color: {
      type: String,
      require: false,
      default: 'blue-grey'
    },
    height: {
      type: String,
      require: false,
      default: '25'
    },
    population: {
      type: Number,
      require: true
    },
    numerator: {
      type: Number,
      require: true
    },

  },
  created() {
    if (this.population !== 0) {
      this.percent = Math.ceil(this.numerator / this.population) * 100
    }
  },
  data() {
    return {
      percent: 0
    }
  }

}
</script>

<style scoped>

</style>