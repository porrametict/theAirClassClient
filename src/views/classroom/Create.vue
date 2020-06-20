<template>
    <div>
        <br>
        <h1 class="display-3  ma-6">Create Classroom</h1>
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


                        ></v-text-field>

                        <v-text-field
                                label="Coursecode"
                                :counter="10"


                        ></v-text-field>

                        <v-text-field
                                label="Section"

                        ></v-text-field>

                        <v-text-field
                                label="credits"


                        ></v-text-field>

                        <v-text-field
                                label="Amount"

                        ></v-text-field>

                        <v-text-field
                                label="Classroomcode "

                        ></v-text-field>

                        <v-textarea
                                label="Detail"
                                :counter="300"
                        ></v-textarea>

                        <div class="text-center ">
                            <v-col class="text-center" cols="12" sm="12">
                                <div class="my-2">
                                    <v-btn
                                            color="primary"
                                            type="button"
                                            @click=" "
                                    >save


                                    </v-btn>
                                    <v-btn
                                            color="grey"
                                            class="black--text"
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
        name: "ClassroomCreate",
        data: () => ({})

    }
</script>

<style scoped>

</style>
