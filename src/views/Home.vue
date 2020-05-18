<template>
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
        <v-container>
            <v-layout row class="ma-4">
                <v-app style="background-color: white" class="rounded">
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-container>
                                <v-row>
                                    <!--search-->
                                        <v-col cols="12" sm="4" md="7" offset-md="10">
                                            <v-text-field
                                                    placeholder="search your classroom ...."
                                                    filled
                                                    rounded
                                                    dense
                                            >
                                                <template v-slot:append>
                                                    <v-fade-transition leave-absolute>
                                                        <v-icon color="yellow">mdi-magnify</v-icon>
                                                    </v-fade-transition>
                                                </template>
                                                <v-icon color="blank">mdi-bell</v-icon>
                                            </v-text-field>
                                        </v-col>

                                    <v-container  >
                                        <v-col offset-md="2">
                                        <v-row>
                                            <!--join1-->
                                            <v-col
                                                    cols="12"
                                                    sm="5"
                                                    offset-md="2"
                                            >
                                                <v-hover
                                                        v-slot:default="{ hover }"
                                                        open-delay="200"
                                                >
                                                    <v-card
                                                            :elevation="hover ? 16 : 2"
                                                            class="mx-auto"
                                                            height="200"
                                                            max-width="200"
                                                    >
                                                    </v-card>
                                                </v-hover>
                                                <div class="font-weight-medium mt-12 text-center subtitle-1" >
                                                    <div class="my-6">
                                                        <v-btn large color="primary">CREATE CLASS</v-btn>
                                                    </div>
                                                </div>
                                            </v-col>


                                            <!--join2-->
                                            <v-col
                                                    cols="12"
                                                    sm="5"

                                            >
                                                <v-hover
                                                        v-slot:default="{ hover }"
                                                        open-delay="200"
                                                >
                                                    <v-card
                                                            :elevation="hover ? 16 : 2"
                                                            class="mx-auto"
                                                            height="200"
                                                            max-width="200"
                                                    >
                                                    </v-card>
                                                </v-hover>
                                                <div class="font-weight-medium mt-12 text-center subtitle-1" >
                                                    <div class="my-6">
                                                        <v-btn large color="primary">JOIN NEW CLASS</v-btn>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        </v-col>
                                    </v-container>

                                    <v-col cols="12" offset-md="1">
                                        <h2>Your Class</h2>
                                    </v-col>


                                    <v-container >
                                        <v-col offset-md="1">
                                            <v-row>
                                                <!--join1-->
                                                <v-col
                                                        cols="12"
                                                        md="5"
                                                >
                                                    <v-hover
                                                            v-slot:default="{ hover }"
                                                            open-delay="200"
                                                    >
                                                        <v-card
                                                                :elevation="hover ? 16 : 2"
                                                                class="mx-auto"
                                                                height="200"
                                                                max-width="200"
                                                        >
                                                        </v-card>
                                                    </v-hover>
                                                    <div class="font-weight-medium mt-12 text-center subtitle-1" >
                                                        <div class="my-6">
                                                            <v-btn large color="primary">JOIN CLASSROOM</v-btn>
                                                        </div>
                                                    </div>
                                                </v-col>


                                                <!--join2-->
                                                <v-col
                                                        cols="12"
                                                        md="5"
                                                >
                                                    <v-hover
                                                            v-slot:default="{ hover }"
                                                            open-delay="200"
                                                    >
                                                        <v-card
                                                                :elevation="hover ? 16 : 2"
                                                                class="mx-auto"
                                                                height="200"
                                                                max-width="200"
                                                        >
                                                        </v-card>
                                                    </v-hover>
                                                    <div class="font-weight-medium mt-12 text-center subtitle-1" >
                                                        <div class="my-6">
                                                            <v-btn large color="primary">JOIN CLASSROOM</v-btn>
                                                        </div>
                                                    </div>
                                                </v-col>

                                            </v-row>

                                        </v-col>
                                    </v-container>
                                </v-row>

                            </v-container>
                        </v-col>
                    </v-row>
                </v-app>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "Home",
        computed:{
            theme(){
                return(this.$vuetify.theme.dark) ? 'dark' : 'light'
            }
        },
        data(){
            return{
                // classroom: {}
            }
        },
        // methods : {
        //     async CreateClassroom() {
        //     }
        // }
    }
</script>

<style scoped>
    .rounded{
        border-radius: 30px;
    }

</style>