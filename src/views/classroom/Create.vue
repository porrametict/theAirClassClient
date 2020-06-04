<template>
    <div>
        <ContentHeader text="Create Classroom"></ContentHeader>
        <div class="ma-5">
            <div class="d-flex justify-space-around align-center flex-wrap">
                <!--image select-->
                <v-card class="text-center" max-width="400" elevation="0">
                    <v-card-text>
                        <ClassroomDefaultImage :text="form.name"
                                               :key="ClassroomDefaultImageKey"
                        ></ClassroomDefaultImage>
                        <circle-image-cropper
                                class="my-2"
                                :imageURL="form.image ? form.image : null"
                                @getOutput="updateImage">
                            <template v-slot:button_area>
                                <ButtonPrimary text="select Image"></ButtonPrimary>
                            </template>
                        </circle-image-cropper>
                    </v-card-text>

                </v-card>
                <!-- form -->
                <v-card max-width="600"
                        elevation="0"
                        class="d-flex flex-column flex-grow-1 pa-5"
                >
                    <div>
                        <v-text-field
                                v-model="form.name"
                                outlined
                                label="Subject"
                                :counter="100"
                        ></v-text-field>
                        <v-text-field
                                outlined
                                label="Course code"
                                v-model="form.course_code"
                                :counter="50"
                        ></v-text-field>

                        <v-text-field
                                v-model="form.section"
                                outlined
                                label="Section"
                                type="number"
                        ></v-text-field>
                        <v-text-field
                                v-model="form.course_credit"
                                class="ma-1 flex-grow-1"
                                type="number"
                                outlined
                                label="Course credits"
                        ></v-text-field>
                        <div class="d-flex flex-column flex-md-row">
                            <v-text-field
                                    v-model="form.lecture_unit"
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="Lectures units "
                            ></v-text-field>
                            <v-text-field
                                    v-model="form.lab_unit"
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="Laboratory units"
                            ></v-text-field>
                            <v-text-field
                                    v-model="form.learn_unit"
                                    class="ma-1"
                                    type="number"
                                    outlined
                                    label="Outside preparation units"
                            ></v-text-field>
                        </div>
                        <v-textarea
                                v-model="form.detail"
                                outlined
                                label="Detail"
                                :counter="300"
                        ></v-textarea>
                    </div>

                </v-card>
            </div>
            <div class="d-flex justify-space-around">
                <ButtonCancel @click="$router.go(-1)"></ButtonCancel>
                <ButtonSubmit @click="save"></ButtonSubmit>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ContentHeader from "../../components/share/ContentHeader";
    import CircleImageCropper from "../../components/share/CircleImageCropper";
    import ButtonPrimary from "../../components/share/ButtonPrimary";
    import ClassroomDefaultImage from "../../components/classroom/ClassroomDefaultImage";
    import ButtonCancel from "../../components/share/ButtonCancel";
    import ButtonSubmit from "../../components/share/ButtonSubmit";

    export default {
        name: "ClassroomCreate",
        components: {
            ButtonSubmit,
            ButtonCancel,
            ClassroomDefaultImage,
            ButtonPrimary,
            CircleImageCropper,
            ContentHeader
        },
        data: () => ({
            ClassroomDefaultImageKey: 0,
            form: {
                name: null,
                course_code: null,
                section: null,
                detail: null,
                course_credit: null,
                lecture_unit: null,
                lab_unit: null,
                learn_unit: null,
                image: null
            }
        }),
        watch: {
            'form.name': function () {
                console.log('The list of colours has changed!')
                this.re_render_ClassroomDefault()
            },
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {
            re_render_ClassroomDefault() {
                this.ClassroomDefaultImageKey += 1
            }, updateImage(image) {
                this.form.image = image
            },
            async save() {
                this.form.owner = this.user.pk
                let data = await this.$store.dispatch("classroom/createClassroom", this.form)
                if (data) {
                    await this.$router.push({name: "IndexClassroom"})
                } else {
                    alert("error")
                }

            }
        }

    }
</script>

<style scoped>

</style>
