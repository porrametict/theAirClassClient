<template>
  <div class="text-center">
    <p class="">Question</p>
    <p class="title">
      {{ data.question.text }}
    </p>
  </div>

</template>

<script>
export default {
  name: "ShowQuestion",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods : {

  }
}
</script>
