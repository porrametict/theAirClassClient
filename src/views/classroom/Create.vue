<template>
    <div>
        <ContentHeader text="Create Classroom"></ContentHeader>
        <div>
            <v-container fluid class="fill-height ma-0 pa-0">
                <div class="d-flex justify-space-around flex-wrap">
                    <div class="ma-2">
                        <v-card
                                width="300"
                                height="250"
                        >
                            <v-card-text class="d-flex flex-column fill-height">
                                Image
                            </v-card-text>
                        </v-card>
                    </div>
                </div>

                <div class="d-flex flex-column flex-grow-1 pa-5">

                    <div>
                        <v-text-field
                                outlined
                                label="Course code"
                                :counter="10"
                        ></v-text-field>

                        <v-text-field
                                outlined
                                label="Section"
                                type="number"
                        ></v-text-field>

                        <div class="d-flex flex-wrap">
                            <v-text-field
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="credits"
                            ></v-text-field>
                            <v-text-field
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="credits"
                            ></v-text-field>
                            <v-text-field
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="credits"
                            ></v-text-field>
                            <v-text-field
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="credits"
                            ></v-text-field>
                        </div>

                        <v-textarea
                                outlined
                                label="Detail"
                                :counter="300"
                        ></v-textarea>
                    </div>

                </div>
            </v-container>
        </div>
    </div>
</template>

<script>
    import ContentHeader from "../../components/share/ContentHeader";

    export default {
        name: "ClassroomCreate",
        components: {ContentHeader},
        data: () => ({})

    }
</script>

<style scoped>

</style>
