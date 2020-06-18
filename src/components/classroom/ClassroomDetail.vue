<template>
    <div class="d-flex" v-if="classroom">
        <div>
            <div class="d-flex ">
                <ClassroomImageDisplay
                        :classroom="classroom"
                        :width="show_detail ?  100 : 60 "
                        :height="show_detail ?  100 : 60"
                        class="ma-2"
                >
                </ClassroomImageDisplay>
                <div class="ma-2">
                    <!--name-->
                    <div class="d-flex">
                        <p class="display-1 font-weight-bold ma-0">{{classroom.name}}</p>
                    </div>

                    <div v-if="show_detail">
                        <span class="mx-2">
                            <span class="font-weight-bold">
                                Course code :
                            </span>
                            {{classroom.course_code}}
                        </span>
                        <span class="mx-2 ">
                            <span class="font-weight-bold">
                                Classroom  Code :
                            </span>
                            {{classroom.classroom_code}}
                        </span>
                        <br>
                        <span class="mx-2">
                            <span class="font-weight-bold">
                                Section :
                            </span>
                            {{classroom.section}}
                        </span>
                        <span class="mx-2">
                            <span class="font-weight-bold">
                                Course Credit  :
                            </span>
                            {{classroom.course_credit}}({{classroom.lecture_unit}}-{{classroom.lab_unit}}-{{classroom.
                            lecture_unit}})
                        </span>
                        <span class="mx-2 red--text">
                            <span class="font-weight-bold">
                                Amount  :
                            </span>
                             NONE
                        </span>

                        <br>
                        <span class="mx-2">
                        <span class="font-weight-bold">Detail :</span>
                         {{classroom.detail}}
                    </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-2 ml-auto d-flex">
            <ConfirmDialog
                    message="Delete this classroom ? "
                    @change="deleteClassroom"
            >
                <template v-slot:activator="{on}">
                    <v-btn
                            icon
                            outlined
                            color="red"
                            v-on="on"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>

            </ConfirmDialog>
            <ButtonIcon
                    class="mx-2"
                    icon="mdi-pencil"
                    tooltip_text="edit classroom"
                    @click="$router.push({name : 'EditClassroom' , params : {
                                    id : classroom.id
                                }})"
            >
            </ButtonIcon>
            <v-btn icon @click="show_detail = !show_detail" outlined>
                <v-icon>
                    mdi-chevron-{{show_detail ? 'up' : 'down'}}
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import ButtonIcon from "../share/ButtonIcon";
    import ClassroomImageDisplay from "./ClassroomImageDisplay";
    import ConfirmDialog from "../share/ConfirmDialog";

    export default {
        name: "ClassroomDetail",
        components: {ConfirmDialog, ClassroomImageDisplay, ButtonIcon},
        props: {
            is_show_detail: {
                type: [String, Boolean],
                require: false,
                default: true
            },
            classroom: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                show_detail: false
            }
        },
        mounted() {
            this.show_detail = this.is_show_detail
        },
        methods: {
            async deleteClassroom(e) {
                if (e) {
                    let data = await this.$store.dispatch('classroom/deleteClassroom', this.classroom.id)
                    if (data) {
                        this.router_push('IndexClassroom')
                    }
                }
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