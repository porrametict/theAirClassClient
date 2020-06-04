<template>
    <div>
        <!--        classroom detail -->
        <ClassroomDetail :classroom="classroom"></ClassroomDetail>
        <v-divider class="mt-2"></v-divider>
        <!--        content-->
        <div>
            <!--            head-->
            <div>
                <v-tabs
                        fixed-tabs
                >
                    <v-tab
                            exact
                            @click="router_push('MemberIndex')"
                    >
                        Member
                    </v-tab>
                    <v-tab
                            exact
                            @click="router_push('QuestionIndex')"

                    >
                        Question
                    </v-tab>
                    <v-tab
                            exact

                    >
                        Watching History
                    </v-tab>

                    <v-tab
                            exact
                            @click="router_push('AssignmentsIndex')"
                    >
                        App
                    </v-tab>
                    <v-tab
                            exact
                    >
                        Assignments
                    </v-tab>
                    <v-tab
                            exact
                            @click="router_push('ScoreIndex')"

                    >
                        Score
                    </v-tab>

                </v-tabs>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import ClassroomDetail from "../../components/classroom/ClassroomDetail";
    import {mapState} from "vuex";

    export default {
        name: "ClassroomMain",
        components: {ClassroomDetail},
        computed: {
            ...mapState({
                classroom: state => state.classroom.classroom
            })
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData() {
                let id = this.$route.params.id
                await this.$store.dispatch('classroom/retrieveClassroom', id)
            },
            router_push(name) {
                if (this.$router.currentRoute.name !== name) {
                    this.$router.replace({name: name}).catch((any) => {
                        console.log(any)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
