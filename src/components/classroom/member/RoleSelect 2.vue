<template>
  <div>
    <v-select
        v-model="role"
        outlined
        dense
        hide-details
        :items="items"
        item-text="text"
        item-value="id"
        :disabled="disable"
        @input="$emit('input',role)"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "RoleSelect",
  props: {
    disable: {
      type: Boolean,
      require: false,
      default: false
    },
    value: {
      type: Number,
      require: true,
    }
  },
  created() {
    this.role = this.value
  },
  data: () => ({
    role: null,
    items: [
      {id: 1, text: 'Owner'},
      {id: 2, text: 'Teacher'},
      {id: 3, text: 'Student'},
    ]
  })
}
</script>

<style scoped>

</style>