<template>
  <div>
    <v-card color="" outlined class="">
      <v-card-title class=" px-4">
        <v-icon class="mx-4" :color="room.status ? 'red' : 'grey'">
          mdi-video-wireless
        </v-icon>
        {{ room.name }}
      </v-card-title>
      <template v-if="room.status">
        <v-divider></v-divider>
        <v-card-actions class="text-end d-flex justify-end grey lighten-3">
          <div>
            <v-btn color="red" class="white--text" @click="$emit('click',room)">
              Join
            </v-btn>
          </div>
        </v-card-actions>
      </template>
      <template v-else>
        <v-divider></v-divider>
        <v-card-actions class="text-end d-flex justify-end grey lighten-3" >
          {{ get_th_time(room.created) }}
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