<template>
    <div>
        <v-container fluid>
            <v-row align="center">
        <v-card
                class="d-inline-block mx-5"

                max-width="400"
        >
            <v-container class="fill-height" >
                <v-row

                >
                </v-row>
            </v-container>
            <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-title>Subject</v-card-title>
            </v-img>

            <v-card-actions>

                <v-card-subtitle class="pb-3">
                    คำอธิบายรายวิชา
                </v-card-subtitle>



                <v-spacer></v-spacer>

                <v-btn
                        icon
                        @click="show1 = !show1"
                >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show1" >
                    <v-divider></v-divider>


                    <v-card-text>
                        การสื่อสารด้วยคำ วลี
                        การแต่งประโยค สำนวน และโวหารในภาษาไทย
                        การจับใจความสำคัญจากการฟังและการอ่าน การเขียนย่อหน้า
                        การสรุปความ และการแสดงความคิดผ่านทักษะการใช้ภาษาไทยที่เหมาะสม
                    </v-card-text>
                </div>
            </v-expand-transition>
            <v-row>
                <v-col class="text-center" cols="12" sm="12" >
                    <div class="my-2">
                        <v-btn
                                color="#FFD600"
                                type="button"
                                @click="SettingDetail "
                        >
                            view
                        </v-btn>
                    </div>
                </v-col>
            </v-row>


        </v-card>

                <v-col  cols="12" sm="6">

                    <v-card
                            class="d-inline-block mx-5"

                            max-width="400"
                    >
                        <v-container class="fill-height" >

                        </v-container>
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                            <v-card-title>Subject</v-card-title>
                        </v-img>

                        <v-card-actions>

                            <v-card-subtitle class="pb-3">
                                คำอธิบายรายวิชา
                            </v-card-subtitle>


                            <v-spacer></v-spacer>


                            <v-btn
                                    icon
                                    @click="show2 = !show2"
                            >
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>


                        <v-expand-transition>

                            <div v-show="show2" >
                                <v-divider></v-divider>

                                <v-card-text>
                                    การสื่อสารด้วยคำ วลี
                                    การแต่งประโยค สำนวน และโวหารในภาษาไทย
                                    การจับใจความสำคัญจากการฟังและการอ่าน การเขียนย่อหน้า
                                    การสรุปความ และการแสดงความคิดผ่านทักษะการใช้ภาษาไทยที่เหมาะสม
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                        <v-row>
                            <v-col class="text-center" cols="12" sm="12" >
                                <div class="my-2">
                                    <v-btn
                                            color="#FFD600"
                                            type="button"
                                            @click=" SettingDetail "
                                    >
                                        view
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>


                    </v-card>

                </v-col>


            </v-row>
        </v-container>



    </div>
</template>

<script>
    export default {
        name: "Profile_classroom",
        data: () => ({
            show1: false,
            show2: false


        }),
        methods: {
            async SettingDetail() {
                this.$router.push('setting-member')
            }
        }
    }
</script>

<style scoped>

</style>
