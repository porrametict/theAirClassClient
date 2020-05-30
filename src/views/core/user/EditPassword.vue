<template>
        <div class="d-flex justify-center align-center fill-height">
            <div class="text-center">
                <p class="display-1 font-weight-black ">Edit Password</p>
                <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="New Password"
                        counter
                        @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                        v-model="password2"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show2 = !show2"
                ></v-text-field>
                <!--button-->
                <div class="ma-5">
                    <div class="d-flex justify-space-around  flex-wrap">
                        <div class="text-center">
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
                                @click="$router.push({name : 'EditProfile'})"
                        >CANCEL
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "UserEditPassword",
        data () {
            return {
                show1: false,
                show2: false,
                password: '',
                password2: '',
                dialog2: false
            }
        }
    }
</script>

<style scoped>

</style>