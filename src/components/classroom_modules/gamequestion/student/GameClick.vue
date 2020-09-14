<template>
  <div>
    <div class="text-center">
      <div>
        คลิกให้ไวที่สุดเพื่อชนะ
      </div>
      <v-btn x-large block color="green" class="white--text" @click="game_click">
        Click me
      </v-btn>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "GameClick",
  props: {
    room: {
      type: [Object],
      require: true
    },
  },
  data: () => ({
    state: {
      'count_click': 0,
      'goal_click': 10
    }
  }),
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  created() {
    this.newWebSocket()
  },
  methods: {
    // main WenSocket
    newWebSocket() {
      let self = this
      this.module_socket = new WebSocket(
          `${window.baseWsURL}/gameclick/${self.room.room_code}/`
      )
      this.module_socket.onopen = function () {
        //self.get_current_state()
      }
      this.module_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.error('Game Click socket closed unexpectedly', e);
        }
      }
      let commands = {
        'on_new_game': self.on_new_question,
        'on_game_click': self.on_game_click,
        'on_get_winner': self.on_get_winner,
      }
      this.module_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
        console.log(command)
        commands[command](data)
      }
    },
    socket_send(data) {
      this.module_socket.send(JSON.stringify(data));
    },
    new_game() {
      let content = {
        "command": "new_game",
        "data": {}
      }
      this.socket_send(content);
    },
    on_new_game(e) {
      this.state = e['data']['state']
    },
    game_click() {
      let content = {
        "command": "game_click",
        "data": {
          user: this.user
        }
      }
      this.socket_send(content);
    },
    on_game_click(e) {
      this.state = e['data']['state']
    },
    on_get_winner(e) {
      if (this.user['pk'] === e['data']['user']['pk']) {
        this.$emit(
            'change', {event: 'game_click', data: e['data']['user']}
        )
      }
      this.$emit(
          'ended', {event: 'game_click', data: {}}
      )

    },


  },
  destroyed() {
    console.log('destroy')
    if (this.module_socket) {
      this.module_socket.close(1000)
    }
  },
}
</script>

<style scoped>

</style>