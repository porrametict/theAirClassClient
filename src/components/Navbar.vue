<template>
    <v-app>
        <div>
            <nav>
                <v-navigation-drawer v-model="drawer" dark="" app class="yellow accent-4">
                    <v-layout column align-center>
                        <v-flex class="mt-10 mb-8">
                            <v-avatar>
                                <v-icon large>mdi-home</v-icon>
                            </v-avatar>
                        </v-flex>
                    </v-layout>
                    <v-list>
                        <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                            <v-list-item-action>
                                <v-icon>{{link.icon}}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{link.text}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
            </nav>
            <v-content>
                <router-view></router-view>
            </v-content>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "Navbar",
        data :() =>({
            drawer: true,
            links: [
                {icon: 'mdi-home', text:'Home', route: '/Home'},
                {icon: 'mdi-home', text:'ProfileSettings', route: '/ProfileSettings'},
            ],
        })
    }
</script>

<style scoped>
    .border{
        border-left: 6px solid #FFD600;
    }

</style>