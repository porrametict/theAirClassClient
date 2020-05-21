<template>
    <div>
        <!--        Search-->
        <div class="ma-5">
            <v-row>
                <v-col cols="12" md="7">

                </v-col>
                <v-col cols="12" md="5">
                    <v-text-field
                            placeholder="search your classroom ...."
                            filled
                            rounded
                            dense
                    >
                        <template v-slot:append>
                            <v-fade-transition leave-absolute>
                                <v-icon color="grey">mdi-magnify</v-icon>
                            </v-fade-transition>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
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
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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

        <div>
            <p class="title ma-6">Your Class</p>
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
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>
                                </div>
                                <div class="text-center">
                                    <v-divider class="ma-2"></v-divider>
                                    <v-btn color="primary"
                                           class="black--text"
                                           @click="$router.push({name : 'MainClassroom'})"
                                    >
                                        Create Class
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
        data: () => ({
            data_list: [
                {
                    name: "Class 1 ",
                    detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                }, {
                    name: "Class 2 ",
                    detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                }, {
                    name: "Class 2 ",
                    detail: " Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                },
            ]
        })
    }
</script>

<style scoped>

</style>