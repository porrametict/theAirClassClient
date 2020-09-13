<template>
  <v-overlay
      v-model="$store.state.spinner.visible"
      color="white"
  >
    <v-progress-circular indeterminate
                         :size="100"
                         :width="15"
                         color="primary"
    />
  </v-overlay>
</template>
<script>
export default {
  name: "LoaderOverlay",
}
</script>

<style scoped>
</style>