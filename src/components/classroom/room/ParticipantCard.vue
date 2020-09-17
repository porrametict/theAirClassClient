<template>
  <v-card class="fill-height d-flex flex-column" outlined v-if="member">
    <v-card-title class="ma-0 pa-2">
      <slot>
        Participant ({{ member.length }})
      </slot>
    </v-card-title>
    <v-divider></v-divider>
    <!--content-->
    <v-card-text class="ma-0 pa-0">
      <v-list>
        <div v-for="(user,index) in member" :key="index">

          <v-list-item>
            <v-list-item-avatar>
              <ImageProfile :user="user"
                            :circle="true"
                            width="40"
                            height="40"
                            font_size_class="title"
              ></ImageProfile>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-left"> {{ user.first_name }} {{ user.last_name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>

      </v-list>


    </v-card-text>
  </v-card>
</template>

<script>
import ImageProfile from "@/components/core/user/ImageProfile";

export default {
  name: "ParticipantCard",
  components: {ImageProfile},
  props: {
    member: {
      type: Array,
      require: true
    }
  },
}
</script>

<style scoped>

</style>