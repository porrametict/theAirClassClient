<template>
    <div>
        <p class="title ma-6">Join or Create</p>
        <div>
            <div class="d-flex justify-space-around flex-wrap">
                <!--            create class-->
                <div class="ma-2">
                    <v-hover
                            v-slot:default="{ hover }"
                            open-delay="200"
                    >
                        <v-card
                                width="300"
                                height="250"
                                :elevation="hover ? 16 : 2"
                        >
                            <v-card-text class="d-flex flex-column fill-height">
                                <div class="text-center flex-grow-1">
                                    <v-icon x-large>
                                        mdi-account
                                    </v-icon>
                                    <p class="title">
                                        Create Class
                                    </p>
                                    <p>
                                        Create New Classroom.
                                    </p>
                                </div>
                                <div class="text-center">
                                    <v-divider class="ma-2"></v-divider>
                                    <v-btn color="primary"
                                           class="black--text"
                                           @click="$router.push({name : 'CreateClassroom'})"
                                    >
                                        Create Class
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </div>
                <!--            join class-->
                <div class="ma-2">
                    <v-hover
                            v-slot:default="{ hover }"
                            open-delay="200"
                    >
                        <v-card
                                width="300"
                                height="250"
                                :elevation="hover ? 16 : 2"
                        >
                            <v-card-text class="d-flex flex-column fill-height">
                                <div class="text-center flex-grow-1">
                                    <v-icon x-large>
                                        mdi-account
                                    </v-icon>
                                    <p class="title">
                                        Join Class
                                    </p>
                                    <p>
                                        Join New Class
                                    </p>
                                </div>
                                <div class="text-center">
                                    <v-divider class="ma-2"></v-divider>
                                    <v-btn color="primary"
                                           class="black--text"
                                           @click="$router.push({name : 'JoinClassroom'})"

                                    >
                                        Join Class
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </div>
            </div>
        </div>
        <v-divider class="mt-6"></v-divider>

        <div>
            <div class="d-flex justify-space-between ma-6">
                <p class="title">Classroom</p>
                <v-btn  small outlined @click="$router.push({name : 'IndexClassroom'})">more</v-btn>
            </div>
            <div class="d-flex justify-center flex-wrap">
                <!--            create class-->
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
    export default {
        name: "Home",
        data() {
            return {
                search: '',
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
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>