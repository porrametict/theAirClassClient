<template>
    <div>
        <v-container class="my-5">
            <v-card flat class="pa-3">
                <v-layout row wrap>
                    <v-flex xs12 md6>
                        <div>
                            <!--image-->
                            <v-row>
                                <v-col
                                        cols="12"
                                        sm="12"
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
                                        </v-card>
                                    </v-hover>

                                    <!--edit-->
                                    <v-col cols="12" sm="3" offset-md="5">
                                        <v-btn>
                                            <v-icon
                                                    :rules="rules2"
                                                    accept="image/png, image/jpeg, image/bmp"
                                            >mdi-camera</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-col>
                            </v-row>
                        </div>
                    </v-flex>

                    <v-flex xs6 sm4 md6>
                        <div>
                            <v-row >
                                    <v-text-field
                                            value="John2"
                                            label="Username"
                                            outlined
                                    >
                                    </v-text-field>
                            </v-row>

                            <v-row>
                                    <v-text-field
                                            value="John"
                                            label="Firstname"
                                            outlined
                                    ></v-text-field>
                            </v-row>

                            <v-row>
                                    <v-text-field
                                            value="Doe"
                                            label="lastname"
                                            outlined
                                    ></v-text-field>
                            </v-row>

                            <v-row>
                                    <v-text-field
                                            value="Johndoe@gmail.com"
                                            label="E-mail"
                                            outlined
                                            readonly
                                    ></v-text-field>
                            </v-row>

                            <v-row>
                                    <v-text-field
                                            v-model="password"
                                            value="John Doe"
                                            label="Password"
                                            :type="show1 ? 'text' : 'password'"
                                            readonly
                                            outlined
                                    >
                                    </v-text-field>
                                        <v-dialog v-model="dialog" persistent max-width="600px">
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
                            </v-row>
                        </div>
                    </v-flex>

                    <!--bottom-->
                    <br>
                    <v-flex xs6 sm7 md7>
                            <div class="text-end" >
                                <v-btn class="ma-2" tile color="yellow" dark>SAVE</v-btn>
                                <v-btn class="ma-2" tile color="red" dark>CANCEL</v-btn>
                            </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>

    </div>

</template>

<script>
    export default {
        name: "ProfileSettings",
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

</style>