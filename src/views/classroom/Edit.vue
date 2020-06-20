<template>
    <div>
        <br>
        <h1 class="display-3  ma-6">Edit Your Class</h1>
        <div>
            <v-container fluid class="fill-height ma-0 pa-0">
            <div class="d-flex justify-space-around flex-wrap">
                <div class="ma-2">
                        <v-card
                                width="300"
                                height="250"
                        >
                            <v-card-text class="d-flex flex-column fill-height">
                                <div class="text-center flex-grow-1 d-flex justify-center align-center fill-height">
                                    <v-file-input
                                            accept="image/png, image/jpeg, image/bmp"
                                            prepend-icon="mdi-image-plus "
                                            label="Picture"
                                    ></v-file-input>



                                </div>

                            </v-card-text>
                        </v-card>
                </div>
            </div>

                <div class="d-flex flex-column flex-grow-1 pa-5">

                    <div>
                        <v-text-field
                                label="Subject"

                                :counter="50"
                                value="Usage of Thai Language"

                        ></v-text-field>

                            <v-text-field
                                    label="Coursecode"
                                    :counter="10"
                                    value="001102[2]"


                            ></v-text-field>

                            <v-text-field
                                    label="Section"
                                    value="1"


                            ></v-text-field>

                            <v-text-field
                                    label="credits"
                                    value="3 (2-2-5)"


                            ></v-text-field>

                            <v-text-field
                                    label="Amount"
                                    value="30"
                                    :counter="30"


                            ></v-text-field>

                            <v-text-field
                                    label="Classroomcode "
                                    value="12345678"
                                    disabled
                                    :counter="10"

                            ></v-text-field>
                        <v-textarea
                                label="Detail"
                                :counter="300"
                                value="การสื่อสารด้วยคำ วลี การแต่งประโยค สำนวน และโวหารในภาษาไทยการจับใจความสำคัญจากการฟังและการอ่าน การเขียนย่อหน้า การสรุปความ และการแสดงความคิดผ่านทักษะการใช้ภาษาไทยที่เหมาะสม "

                        ></v-textarea>

                        <div class="text-center ">
                                <v-col class="text-center" cols="12" sm="12" >
                                    <div class="my-2">
                                        <v-btn
                                                color="primary"
                                                class="black--text"
                                                @click=" "
                                        >save


                                        </v-btn>
                                        <v-btn
                                                class="text--black mx-9"
                                                type="button"
                                                @click=" "
                                        >cancel


                                        </v-btn>
                                    </div>
                                </v-col>
                        </div>
                    </div>

                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClassroomEdit",
        data: () => ({
            show: false,
            show_password: false,
            rules: {
                required: value => !!value || 'Required.',
            },
            methods: {
                async goHomepage (){
                    this.$router.push({
                        name: 'Home'
                    })

                }

            }




        })

    }
</script>

<style scoped>

</style>
