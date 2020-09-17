<template>
  <v-card class="fill-height d-flex flex-column" outlined>
    <v-card-title class="ma-0 pa-2">
      <slot>
        Chat
      </slot>
    </v-card-title>
    <v-divider></v-divider>
    <!--content-->
    <v-card-text class="app-messages">
      <div class="messages-container">
        <div class="messages" v-chat-scroll>
          <div v-for="(m,index) in messages" :key="index" class="d-flex flex-column"
               style="position: relative">
            <MessageRender :data="m"></MessageRender>
          </div>
        </div>
      </div>


    </v-card-text>
    <v-divider></v-divider>
    <!--footer-->
    <v-card-actions class="d-flex flex-column ">

      <v-card v-if="image.name" outlined height="50" class="my-2">
        <v-card-text class="ma-0 pa-2 d-flex justify-center align-center">
                    <span class="text-truncate">
                    {{ image.name }}
                    </span>
          <v-btn icon class="ma-0 pa-0" @click="deleteImageMessage">
            <v-icon small class="ma-0 pa-0">mdi-close</v-icon>
          </v-btn>

        </v-card-text>
      </v-card>

      <div class="d-flex align-center align-self-stretch">
        <InputImageSelect class="mr-1" @change="uploadImage"></InputImageSelect>
        <v-text-field v-model="text_message"
                      outlined
                      dense
                      :disabled="chat_input_disable"
                      class="ma-0 pa-0"
                      hide-details
                      append-outer-icon="mdi-send"
                      :placeholder="chat_input_disable ? 'Wait please..' : 'Type a message..'"
                      @keypress.13="send_message"
                      @click:append-outer="send_message"/>
      </div>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mapState} from "vuex";
import MessageRender from "./MessageRender";
import InputImageSelect from "../../share/InputImageSelect";

export default {
  name: "Chat",
  components: {InputImageSelect, MessageRender},
  props: {
    room: {
      type: [Object],
      require: true
    },
  },
  data: () => ({
    chat_input_disable: false,
    chat: null,
    text_message: null,
    image: {
      id: null,
      name: null,
      image_url: null,
    },
    messages: []
    ,
  }),
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
  },
  methods: {
    newWebSocket() {
      let self = this
      this.chat_socket = new WebSocket(
          `${window.baseWsURL}/chat/${self.room.room_code}/`
      )
      this.chat_socket.onopen = function () {
        self.fetch_message()
      }
      this.chat_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Chat socket closed', e);
        }
      }
      let commands = {
        'on_new_message': self.on_new_message,
        'on_fetch_message': self.on_fetch_message,
      }
      this.chat_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
        commands[command](data)
      }
    },
    socket_send(data) {
      this.chat_socket.send(JSON.stringify(data));
    },
    fetch_message() {
      let data = {
        "command": "fetch_message",
        "data": {
          'room': this.room.id,
        },
      }
      this.socket_send(data);
    },
    on_fetch_message(e) {
      this.messages = e.data
    },
    send_message() {
      let content_type;
      if (this.image.id) {
        content_type = 'image'
      } else {
        content_type = 'text'
      }

      if (this.text_message.trim().length > 0) {
        let data = {
          "command": "new_message",
          "data": {
            'room': this.room.id,
            'user': this.user,
            'content_type': content_type,
            'image_url': this.image.image_url,
            "message": this.text_message,
          },
        }
        this.socket_send(data);
        this.text_message = null
        this.clearImageMessage()
      }
    },
    on_new_message(e) {
      this.messages.push(e.data)
    },
    async uploadImage(e) {
      this.image.name = e.name
      this.chat_input_disable = true
      const fd = new FormData();
      fd.append('image', e, e.name)
      let data = await this.$store.dispatch('classroom_modules/chat/uploadImageMessage', fd)
      if (data) {
        this.image.id = data.id
        this.image.image_url = data.image
      }
      this.chat_input_disable = false
    },
    clearImageMessage() {
      this.image = {
        id: null,
        name: null,
        image_url: null,
      }
    },
    async deleteImageMessage() {
      let data = await this.$store.dispatch('classroom_modules/chat/deleteImageMessage', this.image.id)
      if (data != null) {
        this.clearImageMessage()
      }

    },
  },
  destroyed() {
    if (this.chat_socket) {
      this.chat_socket.close(1000)
    }
  },
}
</script>

<style scoped>
.app-messages {
  background: #FFFFFF;
  position: relative;
  height: 100%;
  padding: 2px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.messages {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;
  width: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


</style>
