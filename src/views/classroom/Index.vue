<template>
    <div>
        <ContentHeader icon="mdi-school" text="Classroom">
        </ContentHeader>

        <div>
            <div class="ma-0 pa-0">
                <v-row>
                    <v-col cols="12" md="6">
                    </v-col>
                    <!--        Search-->
                    <v-col cols="12" md="4">
                        <v-text-field
                                placeholder="search your classroom ...."
                                filled
                                rounded
                                dense
                                hide-details
                        >
                            <template v-slot:append>
                                <v-fade-transition leave-absolute>
                                    <v-icon color="grey">mdi-magnify</v-icon>
                                </v-fade-transition>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <!--        Filter-->
                        <div>
                            <v-select label="ตัวกรอง"
                                      outlined
                                      filled
                                      hide-details
                                      dense
                                      rounded
                                      :items="['เลือก..','เป็นเจ้าของ','เป็นอาจารย์','เป็นนักเรียน']">
                            </v-select>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>


        <div>
            <div class="d-flex justify-center flex-wrap">
                <!--            join class-->
                <div class="ma-5" v-for="(item,index) in data_list" :key="index">
                    <v-hover
                            v-slot:default="{ hover }"
                            open-delay="200"
                    >
                        <v-card
                                width="300"
                                height="250"
                                :elevation="hover ? 16 : 2"
                                :search="search"
                        >
                            <v-card-text class="d-flex flex-column fill-height">
                                <div class="text-center flex-grow-1">
                                    <div class="d-flex justify-center">
                                        <v-img :src="img_url" width="60" height="60" max-width="60" max-height="60"
                                               class="ma-2"/>
                                    </div>
                                    <div :search="search">
                                        <p class="title">
                                            Usage of Thai Language
                                        </p>
                                        <p>
                                            การสื่อสารด้วยคำ วลี
                                        </p>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <v-divider class="ma-2"></v-divider>
                                    <v-btn color="primary"
                                           class="black--text"
                                           @click="$router.push({name : 'BoardClassroom'})"
                                    >JOIN
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ContentHeader from "../../components/share/ContentHeader";

    export default {
        name: "ClassroomIndex",
        components: {ContentHeader},
        data() {
            return {
                search: null,
                img_url: "https://png.pngtree.com/png-clipart/20190903/original/pngtree-a-stack-of-books-and-plants-together-png-image_4429927.jpg",
                data_list: [
                    {
                        name: "Usage of Thai Language ",
                        detail: " การสื่อสารด้วยคำ วลี "
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    }, {
                        name: "Class 2 ",
                        detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>