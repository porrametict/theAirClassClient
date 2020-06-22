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
                                    <ButtonPrimary
                                            @click="$router.push({name : 'CreateClassroom'})"
                                    >
                                        Create Class
                                    </ButtonPrimary>
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
                                    <ButtonPrimary
                                            @click="$router.push({name : 'JoinClassroom'})"
                                    >
                                        Join Class

                                    </ButtonPrimary>
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
                <v-btn text small @click="$router.push({name : 'IndexClassroom'})">more >></v-btn>
            </div>
        </div>
        <div class="display-4 grey--text text-center">
                    Coming Soon.
        </div>
    </div>
</template>
<script>
    import ButtonPrimary from "../../components/share/ButtonPrimary";
    export default {
        name: "Home",
        components: {ButtonPrimary},
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

</style>