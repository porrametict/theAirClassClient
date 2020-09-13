
<template>
  <v-snackbar
      :timeout="6000"
      :color="'error'"
      :multi-line="true"
      :vertical="true"
      v-model="showError">
    <p>
      ERROR
    </p>
    <ul v-if=" getObjSize(error) <=  20">
      <li v-for="(value,key) in error" :key="key">
        <p v-if="key === 'non_field_errors'">
          {{value}}
        </p>
        <p v-else>
          [ {{key}} ] {{value}}
        </p>

      </li>
    </ul>
    <p v-else>
      500 Internal Server Error <br>
      Please check your content or Contact IT Support
    </p>
    <v-btn depressed class="white--text error" @click.native="$store.dispatch('error/toggleError',false)">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
export default {
  name: "ErrorSnackbar",
  computed: {
    ...mapGetters({
      error: "error/getError",
    }),
    ...mapState({
      showError: state => state.error.showError
    })
  },
  mounted() {
    this.$store.dispatch('error/resetError')
  },
  created() {
  },
  methods: {
    getObjSize(Obj) {
      let ol = Object.keys(Obj);
      return ol.length
    }
  }
}
</script>

<style scoped>
</style>