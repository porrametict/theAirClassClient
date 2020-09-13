<template>
    <div>
        <ContentHeader text="Create Classroom"></ContentHeader>
        <div class="ma-5">
            <div class="d-flex justify-space-around align-center flex-wrap">
                <!--image select-->
                <v-card class="text-center" max-width="400" elevation="0">
                    <v-card-text>
                        <FreeLicenseImage
                                asset_src="classroom.png"
                                height="260"
                                a_text="Designed by stories / Freepik"
                                href="http://www.freepik.com"
                        >
                        </FreeLicenseImage>
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
                        <div class="d-flex flex-column justify-center flex-md-row justify-md-space-around align-md-baseline">
                            <circle-image-cropper
                                    class="ma-0 pa-0"
                                    @getOutput="updateImage">
                                <template v-slot:button_area>
                                    <ButtonPrimary :text=" !form.image ? 'choose Image' : 'change Image'"
                                                   :color=" !form.image ? 'grey lighten-1' : 'light-blue lighten-1' "></ButtonPrimary>
                                </template>

                            </circle-image-cropper>
                            <p class="d-none d-md-block">
                                <span v-if="!form.image">
                                Upload your image classroom
                                    <v-icon color="green">
                                        mdi-emoticon-happy
                                    </v-icon>
                                </span>
                                <span v-else>
                                That's Cool
                                    <v-icon color="green">
                                        mdi-emoticon-lol
                                    </v-icon>
                                </span>
                            </p>
                        </div>
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
    import ClassroomImageDisplay from "../../components/classroom/ClassroomImageDisplay";
    import FreeLicenseImage from "../../components/share/FreeLicenseImage";

    export default {
        name: "ClassroomCreate",
        components: {
            FreeLicenseImage,
            ClassroomImageDisplay,
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
                }

            }
        }

    }
</script>

<style scoped>

</style>
