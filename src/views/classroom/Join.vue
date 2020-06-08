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
        <DialogPrimary
                title="Join Classroom"
                @primary_btn_click="joinClassroom"
        >
            <div class="text-center ma-5"
                 v-if="classroom"
            >
                <p class="ma-0 pa-0 title grey--text">classroom</p>
                <p class="display-1 black--text">
                    {{classroom.name}}
                </p>
            </div>
            <v-divider></v-divider>
            <template v-slot:right_btn="{on}">
                <ButtonPrimary v-on="on">Join</ButtonPrimary>
            </template>
        </DialogPrimary>
    </div>
</template>

<script>
    import ButtonPrimary from "../../components/share/ButtonPrimary";
    import {mapState} from 'vuex'
    import DialogPrimary from "../../components/share/DialogPrimary";
    import {EventBus} from "../../event-bus";

    export default {
        name: "ClassroomJoin",
        components: {DialogPrimary, ButtonPrimary},
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
                        EventBus.$emit('open-dialog-primary');
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
                } else {
                    alert("Some Error")
                }
            }
        }
    }
</script>

<style scoped>

</style>
