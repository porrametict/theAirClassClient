<template>
  <div>
    {{ room }}
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Webcam",
  props: {
    room: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      my_role: null,
      room_socket: null,
      member: [],
    }
  },
  async mounted() {
    if (!this.user) {
      await this.$store.dispatch('user/getUser')
    }
    this.newWebSocket()
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }, methods: {
    newWebSocket() {
      let self = this
      this.room_socket = new WebSocket(
          `${window.baseWsURL}/web-rtc-room/${self.room.room_code}/`
      )
      this.room_socket.onopen = function () {
        self.join_room()
      }
      this.room_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Room socket closed', e);
        }
      }
      let commands = {
        'on_member_join': self.on_member_join,
        'on_member_leave': self.on_member_leave,
      }
      this.room_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
        commands[command](data)
      }
    },
    socket_send(data) {
      this.room_socket.send(JSON.stringify(data));
    },
    // WebSocket functions
    join_room() {
      let content = {
        "command": "member_join",
        "data": {
          "user": this.user,
          "classroom": this.room.classroom
        }
      }
      this.socket_send(content);
    },
    on_member_join(e) {
      console.log("member leave", e['data']['user'])
      this.member = e['data']['member']
      if (e['data']['user']['user'] === this.user.pk) { // is me
        this.my_role = e['data']['user']['role']
      }
    },
    on_member_leave(e) {
      console.log("member leave", e['data']['user'])
      this.member = e['data']['member']
    },
  },
  destroyed() {
    if (this.room_socket) {
      this.room_socket.close(1000)
    }
  },
}
</script>

<style scoped>

</style>