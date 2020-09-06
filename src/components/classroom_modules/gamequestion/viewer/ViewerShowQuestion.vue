<template>
  <div class="text-center">
    <p class="">Question</p>
    <p class="title">
      {{ data.question }}
    </p>
  </div>

</template>

<script>
export default {
  name: "ViewerShowQuestion",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods: {}
}
</script>
