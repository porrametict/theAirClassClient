<template>
    <div class="d-flex justify-center align-center fill-height">
        <div class="text-center">
            <p class="display-1 font-weight-black">Join Classroom</p>
            <v-text-field
                    v-model="form_params.search"
                    placeholder="enter classroom code"
                    filled
                    rounded
                    dense
            >
            </v-text-field>
            <v-btn rounded
                   color="primary"
                   class="black--text"
                   large
                   @click="searchClassroom"
            >
                join new classroom
            </v-btn>
        </div>

        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="primary">
                    <p class="ma-0 pa-0">Join Classroom</p>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = !dialog">
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text v-if="classroom" class="ma-0 pa-0">
                    <div class="text-center ma-5">
                        <p class="ma-0 pa-0 title grey--text">classroom</p>
                        <p class="display-1 black--text">
                            {{classroom.name}}
                        </p>
                    </div>
                    <v-divider></v-divider>
                </v-card-text>
                <v-card-actions class="">
                    <ButtonPrimary text="Join" class="mx-auto" @click="joinClassroom"></ButtonPrimary>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import ButtonPrimary from "../../components/share/ButtonPrimary";
    import {mapState} from 'vuex'

    export default {
        name: "ClassroomJoin",
        components: {ButtonPrimary},
        data: () => ({
            dialog: false,
            form_params: {
                search: null
            },
            form: {
                user: null,
                classroom: null
            },
            classrooms: null,
            classroom: null,
        }),
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {
            async searchClassroom() {
                if (this.form_params.search) {
                    let data = await this.$store.dispatch('classroom/getListClassroom', this.form_params)
                    this.classrooms = data.results
                    if (this.classrooms.length) {
                        this.classroom = this.classrooms[0]
                        this.dialog = true
                    } else {
                        alert("Not Found")
                    }
                } else {
                    alert("Please enter Classroom Code")
                }
            },
            async joinClassroom() {
                this.form.user = this.user.pk
                this.form.classroom = this.classroom.id
                let data = await this.$store.dispatch('classroom_modules/member/addClassroomMember', this.form)
                if (data) {
                    await this.$router.push({
                        name: 'BoardClassroom',
                        params: {
                            id: data.classroom
                        }
                    })
                }else {
                    alert("Some Error")
                }
            }
        }
    }
</script>

<style scoped>

</style>
