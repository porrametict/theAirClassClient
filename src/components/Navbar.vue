<template>
  <div>
    <v-navigation-drawer
            v-model="drawer"
            dark
            app
            class="yellow accent-4"
            permanent
            expand-on-hover
            :mini-variant.sync="mini"


    >
      <v-layout column align-center>
        <v-flex class="mt-10 mb-8">
                      <v-img :src="require(`@/assets/logo_theairclass.png`)" 
                      width="100%" 
                      height="100%"
                      />


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

        <div class="pa-2"  v-if="!mini">
          <v-btn
              block
              @click="$store.dispatch('user/logout') & $router.push({ name: 'Login' })"
          >Logout</v-btn>
        </div>

        <div v-else>
          <v-btn icon large color="black">
            <v-icon>
              mdi-account-arrow-right
            </v-icon>
          </v-btn>
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
    mini  : true,
    links: [
      { icon: "mdi-home", text: "Home", route: "/home" },
      { icon: "mdi-school", text: "Classroom", route: "/classroom" },
      { icon: "mdi-account", text: "Profile", route: "/user" }
    ],
  })
};
</script>

<style scoped>
.border {
  border-left: 6px solid #eac505;
}
</style>