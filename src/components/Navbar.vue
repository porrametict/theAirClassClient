<template>
  <div>
    <v-navigation-drawer
            v-model="drawer"
            dark
            app
            class="yellow accent-4"
            permanent
    >
      <v-layout column align-center>
        <v-flex class="mt-10 mb-8">
          <v-avatar>
            <v-icon large color="black">mdi-home</v-icon>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          active-class="border"
        >
          <v-list-item-action>
            <v-icon color="black">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="black--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            @click="$store.dispatch('user/logout') & $router.push({ name: 'Login' })"
          >Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data: () => ({
    drawer: true,
    links: [
      { icon: "mdi-home", text: "Home", route: "/home" },
      { icon: "mdi-school", text: "Classroom", route: "/classroom" },
      { icon: "mdi-account", text: "Profile", route: "/user" }
    ]
  })
};
</script>

<style scoped>
.border {
  border-left: 6px solid #eac505;
}
</style>