<template>
  <div>
    <v-card color="" outlined class="">
      <v-card-title class=" px-4">
        {{ room.room_code }}
      </v-card-title>
      <template v-if="room.status">
        <v-divider></v-divider>
        <v-card-actions>
          <div>
            <v-btn color="primary" @click="$emit('click',room)">
              Join
            </v-btn>
          </div>
        </v-card-actions>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RoomRender",
  props: {
    room: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>

</style>