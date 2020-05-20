<template>
    <div>
        <br>
        <h1 class="ma-6">รายละเอียดรายวิชา</h1>
        <div>
            <v-container class="fill-height" >
                <v-card
                        class="d-inline-block mx-5"

                        max-width="400"
                >



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
                                @click="show = !show"
                        >
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show">

                            <v-card-text>
                                การสื่อสารด้วยคำ วลี
                                การแต่งประโยค สำนวน และโวหารในภาษาไทย
                                การจับใจความสำคัญจากการฟังและการอ่าน การเขียนย่อหน้า
                                การสรุปความ และการแสดงความคิดผ่านทักษะการใช้ภาษาไทยที่เหมาะสม
                            </v-card-text>
                        </div>
                    </v-expand-transition>


                </v-card>
                <v-spacer></v-spacer>

                <v-form v-model="valid">
                    <v-container>
                        <div class="mb-6">
                            <v-row>

                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <v-text-field
                                            label="Subject"
                                            :rules="nameRules"
                                            :counter="50"
                                            value="Usage of Thai Language"

                                    ></v-text-field>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <v-text-field
                                            label="Coursecode"
                                            :counter="10"
                                            value="001102[2]"


                                    ></v-text-field>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <v-text-field
                                            label="Section"
                                            value="1"


                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <v-text-field
                                            label="credits"
                                            value="3 (2-2-5)"


                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <v-text-field
                                            label="Amount"
                                            value="30"
                                            :counter="30"


                                    ></v-text-field>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="10"
                                >
                                    <v-text-field
                                            label="Classroomcode "
                                            value="12345678"
                                            :counter="10"


                                    ></v-text-field>
                                    <v-col class="text-center" cols="12" sm="12" >
                                        <div class="my-2">
                                            <v-btn
                                                    color="#FFD600"
                                                    type="button"
                                                    @click=" "
                                            >save


                                            </v-btn>
                                            <v-btn
                                                    class="mx-9"
                                                    color="#FFFFFF"
                                                    type="button"
                                                    @click=" "
                                            >cancel


                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-col>

                            </v-row>
                        </div>
                    </v-container>
                </v-form>
            </v-container>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Classroom_edit",
        data: () => ({
            show: false,
        })

    }
</script>

<style scoped>

</style>
