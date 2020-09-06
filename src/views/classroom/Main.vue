<template>
    <div>
        <!--        classroom detail -->
        <ClassroomDetail :classroom="classroom"></ClassroomDetail>
        <v-divider class="mt-2"></v-divider>
        <!--        content-->
        <div>
            <v-tabs v-model="activeTab" grow>
                <v-tab v-for="(tab,index) of tabs" :key="index" :to="{name : tab.route}" exact >
                    {{ tab.name }}
                </v-tab>
            </v-tabs>
            <router-view></router-view>
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
        data () {
            return {
                activeTab : null,
                tabs: [
                    { name: "Member", route: `MemberIndex` },
                    { name: "App", route: `ClassroomModuleIndex` }
                ]
            }
        },
        mounted() {
            this.router_push('MemberIndex')
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
