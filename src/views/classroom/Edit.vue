<template>
  <div v-if="classroom_state">
    <ContentHeader text="Edit Classroom"></ContentHeader>
    <div class="ma-5">
      <div class="d-flex justify-space-around align-center flex-wrap">
        <!--image select-->
        <v-card class="text-center" max-width="400" elevation="0">
          <v-card-text>
            <ClassroomImageDisplay
                :key="ClassroomImageDisplayKey"
                :classroom="classroom_state"
            >
            </ClassroomImageDisplay>
            <circle-image-cropper
                :key="ImageCropperComponentKey"
                class="my-2"
                :imageURL="classroom_state.image ? classroom_state.image : null"
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
import ClassroomImageDisplay from "../../components/classroom/ClassroomImageDisplay";

export default {
  name: "ClassroomEdit",
  components: {
    ClassroomImageDisplay,
    ButtonSubmit,
    ButtonCancel,
    ClassroomDefaultImage,
    ButtonPrimary,
    CircleImageCropper,
    ContentHeader
  },
  data: () => ({
    ClassroomImageDisplayKey: 0,
    ImageCropperComponentKey: 1,
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
      if (!this.classroom_state.image || this.classroom_state.image === "") {
        this.re_render_ClassroomImage()
      }
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      classroom_state: state => state.classroom.classroom
    })
  },
  async mounted() {
    await this.loadData()
    this.form = this.classroom_state
  },
  methods: {
    async loadData() {
      let id = this.$route.params.id
      await this.$store.dispatch('classroom/retrieveClassroom', id)
    },
    re_render_ClassroomImage() {
      this.ClassroomImageDisplayKey += 1
      this.ImageCropperComponentKey += 1
    }, async updateImage(image) {
      this.form.image = image
      let data = await this.$store.dispatch("classroom/updateClassroom", this.form)
      if (data) {
        this.re_render_ClassroomImage()
      }
    },
    async save() {
      this.form.owner = this.user.pk
      delete this.form.image
      let data = await this.$store.dispatch("classroom/updateClassroom", this.form)
      if (data) {
        // await this.$router.go(-1)
      }
    }
  }

}
</script>

<style scoped>

</style>
