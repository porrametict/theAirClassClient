<template>
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
        <v-container >
            <v-layout row class="ma-4" >
                <v-app style="background-color: white" class="rounded" >
                    <v-row >
                        <v-col cols="12" md="8">
                            <v-container >
                                    <div>
                                        <v-container class="my-9">
                                            <v-card flat class="pa-3">
                                                <v-layout row wrap  >
                                                    <v-flex xs12 md6>
                                                        <!--image-->
                                                        <v-col
                                                                cols="12"
                                                                md="20"
                                                        >
                                                            <v-hover
                                                                    v-slot:default="{ hover }"
                                                                    open-delay="200"
                                                            >
                                                                <v-card
                                                                        :elevation="hover ? 16 : 2"
                                                                        class="mx-auto"
                                                                        height="250"
                                                                        max-width="250"
                                                                >
                                                                    <!--edit-->
                                                                    <v-row align="end" justify="center" >
                                                                        <v-btn >
                                                                            <v-icon>mdi-camera</v-icon>
                                                                        </v-btn>
                                                                    </v-row>

                                                                </v-card>
                                                            </v-hover>
                                                        </v-col>
                                                    </v-flex>
                                                    <v-flex xs12 md6>
                                                        <v-row>
                                                            <v-col cols="12" md="20">
                                                                <v-text-field
                                                                        value="John2"
                                                                        label="Username"
                                                                        outlined
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-col cols="12" md="20">
                                                            <v-row>
                                                                <v-text-field
                                                                        value="John"
                                                                        label="Firstname"
                                                                        outlined
                                                                ></v-text-field>
                                                            </v-row>
                                                        </v-col>
                                                        <v-row>
                                                            <v-col cols="12" md="20">
                                                                <v-text-field
                                                                        value="John2"
                                                                        label="Username"
                                                                        outlined
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="12" md="20" >
                                                                <v-text-field
                                                                        value="John2"
                                                                        label="Username"
                                                                        outlined
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="12" md="20">
                                                                <v-text-field
                                                                        value="Doe"
                                                                        label="lastname"
                                                                        outlined
                                                                >
                                                                </v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="12" md="20">
                                                                <v-text-field
                                                                        value="Johndoe@gmail.com"
                                                                        label="E-mail"
                                                                        outlined
                                                                        readonly
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="12" md="20">
                                                                <v-text-field
                                                                        v-model="password"
                                                                        value="John Doe"
                                                                        label="Password"
                                                                        :type="show1 ? 'text' : 'password'"
                                                                        append-icon="mdi-pencil"
                                                                        readonly
                                                                        outlined
                                                                >
                                                                </v-text-field>
                                                                <v-dialog v-model="dialog" persistent max-width="600px" >
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn color="primary" dark v-on="on">
                                                                            <v-icon>mdi-pencil</v-icon>
                                                                        </v-btn>
                                                                    </template>
                                                                    <v-card>
                                                                        <v-card-title>
                                                                            <span class="headline">New Password</span>
                                                                        </v-card-title>
                                                                        <v-card-text>
                                                                            <v-container>
                                                                                <v-row>
                                                                                    <v-col cols="12">
                                                                                        <v-text-field label="New Password*" type="password" required></v-text-field>
                                                                                    </v-col>
                                                                                    <v-col cols="12">
                                                                                        <v-text-field label="Confirm Password*" type="password" required></v-text-field>
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-container>
                                                                            <small>*indicates required field</small>
                                                                        </v-card-text>
                                                                        <v-card-actions>
                                                                            <v-spacer></v-spacer>
                                                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                                                            <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-dialog>
                                                            </v-col>
                                                        </v-row>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row wrap >
                                                    <v-row justify="end">
                                                        <v-flex xs12 md4 >
                                                            <v-btn class="ma-2" tile color="#FFD600" text.dark>SAVE</v-btn>
                                                        </v-flex>
                                                        <v-flex xs12 md4>
                                                            <v-btn class="ma-2" tile color="red" text.dark>CANCEL</v-btn>
                                                        </v-flex>
                                                    </v-row>
                                                </v-layout>
                                            </v-card>
                                        </v-container>
                                    </div>
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
        name: "ProfileSettings",
        components: {

        },
        computed: {
            theme() {
                return (this.$vuetify.theme.dark) ? 'dark' : 'light'
            }
        },
        data () {
            return {
                rules2: [
                    value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
                dialog: false,
                show1: false,
                password: 'Password',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                },
            }
        },
    }
</script>

<style scoped>
    .rounded{
        border-radius: 30px;
        width: 1500px;

    }

</style>