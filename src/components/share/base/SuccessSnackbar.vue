<template>
  <div>
    <v-snackbar
        :timeout="6000"
        :color="'success'"
        v-model="$store.state.success.showSuccess"
    >
      SUCCESS
      <v-btn depressed class="white--text success" @click.native="$store.dispatch('success/toggleSuccess',false)">
        Close
      </v-btn>
    </v-snackbar>
  </div>

</template>

<script>
export default {
  name: "SuccessSnackbar",
}
</script>

<style scoped>
</style>