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
            <div class="d-flex justify-space-between ma-6 mb-0">
                <p class="title">Classroom</p>
                <v-btn v-if="classrooms && classrooms.length" text small @click="$router.push({name : 'IndexClassroom'})">more >></v-btn>
            </div>
        </div>
        <div v-if="classrooms && classrooms.length">
            <v-row justify-sm="center" justify-md="start">
                <v-col cols="12" md="4" v-for="(classroom,index) in classrooms" :key="index">
                    <ClassroomCard
                            class="ma-5"
                            :classroom="classroom.classroom_data"
                    ></ClassroomCard>
                </v-col>
            </v-row>
        </div>
        <div v-else class="d-flex flex-column justify-center align-center ">
            <p class="headline">You don't have any classroom.</p>
            <p>Join classroom now.</p>
            <ButtonPrimary
                    @click="$router.push({name : 'JoinClassroom'})"
            >
                Join Class

            </ButtonPrimary>

        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import ButtonPrimary from "../../components/share/ButtonPrimary";
    import ClassroomCard from "../../components/classroom/ClassroomCard";

    export default {
        name: "Home",
        components: {ClassroomCard, ButtonPrimary},
        data() {
            return {
                classrooms: null,
                form_params: {
                    role: null,
                    limit: 3,
                    offset: 0,
                    user__id: null
                },
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        async mounted() {
            if (!this.user) {
                await this.$store.dispatch('user/getUser')
            }
            await this.loadData()
        },
        methods: {
            async loadData() {
                this.form_params.user__id = this.user.pk
                let data = await this.$store.dispatch('classroom/getListClassroomByUser', this.form_params)
                this.classrooms = data.results
            }
        }
    }
</script>

<style scoped>

</style>