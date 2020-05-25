<template>
    <div>
        <div class="ma-8">
            <div class="d-flex justify-space-around  flex-wrap" >
                <!-- image-->
                <div>
                    <div class="ma-2" >
                            <v-card-text class="d-flex flex-column fill-height">
                                <div class="text-center flex-grow-1">
                                    <img src="mdi-image" height="200" width="200">
                                </div>
                                <div class="text-center">
                                    <div class="ma-2" ></div>
                                    <v-btn
                                            rounded
                                            color="primary"
                                            class="black--text"
                                            @click.stop="dialog = true"
                                    >Edit
                                    </v-btn>
                                    <div>
                                        <v-dialog
                                                v-model="dialog"
                                                max-width="400"
                                        >
                                            <v-card>
                                                <v-card-title class="headline">Edit Image</v-card-title>
                                                <div class="d-flex justify-center">
                                                    <input type="file" @change="onFileSelected" >
                                                </div>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                            color="gray"
                                                            text
                                                            @click="dialog = false"
                                                    >CANCEL
                                                    </v-btn>
                                                    <v-btn
                                                            color="primary"
                                                            text
                                                            @click="onUpload"
                                                    >Upload
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </div>
                                </div>
                            </v-card-text>
                        </div>
                </div>
                <!--details-->
                <div  class="ma-5">
                    <div>
                        <v-text-field
                                value="John2"
                                label="Username"
                                outlined
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <v-text-field
                                value="John"
                                label="Firstname"
                                outlined
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <v-text-field
                                value="Doe"
                                label="Lastname"
                                outlined
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <v-text-field
                                value="JohnDddd2@gmail.com"
                                label="E-mail"
                                readonly
                                outlined
                        >
                        </v-text-field>
                    </div>
                    <div>
                        <v-text-field
                                v-model="password"
                                value="12345678"
                                label="Password"
                                :type="show1 ? 'text' : 'password'"
                                readonly
                                outlined

                        >
                        </v-text-field>
                        <div class=" text-center text-md-end">
                            <p>
                                <router-link to="/user/edit-password">Edit Password?</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--button-->
        <div class="ma-5">
            <div class="d-flex justify-space-around  flex-wrap">
                <div class="text-center">
                    <div class="ma-2" ></div>
                    <v-btn
                            rounded
                            color="primary"
                            class="black--text"
                            @click.stop="dialog2 = true"
                    >SAVE
                    </v-btn>
                    <div>
                        <v-dialog
                                v-model="dialog2"
                                max-width="400"
                        >
                            <v-card>
                                <v-card-title class="headline">Are you sure?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="gray"
                                            text
                                            @click="dialog2 = false"
                                    >NO
                                    </v-btn>
                                    <v-btn
                                            color="primary"
                                            text
                                            @click="onUpload"
                                    >YES
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </div>

                <v-btn
                        rounded
                        color="gary"
                        class="black--text"
                        @click="$router.push({name : 'Profile'})"
                >CANCEL
                </v-btn>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "UserEditProfile",
        data () {
            return {
                dialog: false,
                dialog2: false,
                dialog3: false,
                selectedFile: null,
                show1: false,
                password: 'Password',
            }
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },
            onUpload(){


            }
        }
    }
</script>

<style scoped>

</style>