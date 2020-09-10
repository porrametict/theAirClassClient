<template>
  <div>
    <!-- edit User Profile-->
    <div v-if="user">
      <!--header-->
      <ContentHeader icon="mdi-account-edit" text="Edit Profile" :key="0"></ContentHeader>
      <div class="ma-8">
        <div class="d-flex justify-space-around  flex-wrap">
          <!-- image-->
          <v-card class="d-flex flex-column align-center" min-width="400" elevation="0">
            <image-profile :user="user" class="ma-4"></image-profile>
            <circle-image-cropper
                :key="ImageCropperComponentKey"
                :imageURL="user.profile ? user.profile.image : null"
                @getOutput="updateImage">
              <template v-slot:button_area>
                <ButtonPrimary text="edit"></ButtonPrimary>
              </template>
            </circle-image-cropper>
          </v-card>
          <!--details-->
          <v-card class="ma-5" min-width="200" elevation="0">
            <div>
              <v-text-field
                  label="Username"
                  outlined
                  v-model="user.username"
                  disabled
              >
              </v-text-field>
            </div>
            <div>
              <v-text-field
                  label="E-mail"
                  readonly
                  outlined
                  disabled
                  v-model="user.email"
              >
              </v-text-field>
            </div>
            <div>
              <v-text-field
                  label="Firstname"
                  outlined
                  v-model="user.first_name"
                  :rules="[rules.required]"
              >
              </v-text-field>
            </div>
            <div>
              <v-text-field
                  label="Lastname"
                  outlined
                  v-model="user.last_name"
                  :rules="[rules.required]"
              >
              </v-text-field>
            </div>


          </v-card>
        </div>
      </div>
      <!--button-->
      <div class="ma-5">
        <div class="d-flex justify-space-around flex-wrap">
          <ButtonCancel @click="$router.push({name : 'Profile'})"></ButtonCancel>
          <ButtonSubmit @click="updateProfile"></ButtonSubmit>
        </div>
      </div>
    </div>

    <v-divider class="my-2"></v-divider>

    <!-- Change Password-->
    <div>
      <!--header-->

      <ContentHeader icon="mdi-lock" text="Change Password" :key="1">
                        <span class="title">Change Password
                    </span>
      </ContentHeader>


      <!--body-->
      <div class="ma-8">
        <div class="d-flex justify-space-around flex-wrap">
          <v-card class="" outlined min-width="400">
            <v-card-title class="d-flex justify-space-around">
              <v-icon>
                mdi-information
              </v-icon>
              Guidelines for Strong Password
            </v-card-title>
            <v-card-text>
              <ul>
                <li>password must be between 8 - 32 characters.</li>
                <li>password must be English alphabet only.</li>
                <li>the use of both upper-case and lower-case letters .</li>
                <li>inclusion of one or more numerical digits .</li>
                <li>inclusion of special characters, such as @, #, $</li>
              </ul>
            </v-card-text>
          </v-card>
          <!--form-->
          <v-card class="ma-5" elevation="0" min-width="200">
            <v-text-field
                outlined
                v-model="change_password_form.new_password1"
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password ? 'text' : 'password'"
                name="input-10-1"
                label="New Password"
                counter
                :rules="[rules.required,rules.min]"
                @click:append="show_password = !show_password"
                :error="!!(error.new_password2 || error.new_password1)"
                :error-messages="error.new_password1"
            ></v-text-field>
            <v-text-field
                outlined
                v-model="change_password_form.new_password2"
                :append-icon="show_password_confirmed ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show_password_confirmed ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm Password"
                counter
                :rules="[rules.required,rules.min,rulePasswordMatch]"
                @click:append="show_password_confirmed = !show_password_confirmed"
                :error="!!(error.new_password2 || error.new_password1)"
                :error-messages="error.new_password2"

            ></v-text-field>
            <div class="text-center">
              <ConfirmDialog @change="on_confirm('change_password',$event)" text_btn="change">
              </ConfirmDialog>
            </div>
          </v-card>
        </div>
      </div>

    </div>
  </div>

</template>


<script>
import CircleImageCropper from "../../../components/share/CircleImageCropper";
import {mapState} from 'vuex'
import DefaultAvatar from "../../../components/core/user/DefaultAvatar";
import ConfirmDialog from "../../../components/share/ConfirmDialog";
import ImageProfile from "../../../components/core/user/ImageProfile";
import ContentHeader from "../../../components/share/ContentHeader";
import ButtonCancel from "../../../components/share/ButtonCancel";
import ButtonSubmit from "../../../components/share/ButtonSubmit";
import ButtonPrimary from "../../../components/share/ButtonPrimary";
import Base from '@/components/share/base/Base'

export default {

  name: "UserEditProfile",
  extends: Base,
  components: {
    ButtonPrimary,
    ButtonSubmit,
    ButtonCancel,
    ContentHeader, ImageProfile, ConfirmDialog, DefaultAvatar, CircleImageCropper
  },
  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
        min: function (v) {
          return (v && v.length >= 8) || 'Min 8 characters'
        }
      },
      VImgComponentKey: 0,
      ImageCropperComponentKey: 1,
      change_password_form: {
        new_password1: "",
        new_password2: ""
      },
      show_password: false,
      show_password_confirmed: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
  },
  methods: {
    forceRenderImgDisplay() {
      this.VImgComponentKey += 1
      this.ImageCropperComponentKey += 1
    },
    rulePasswordMatch(value) {
      return (value === this.change_password_form.new_password1) || "Password not match"
    },
    async updateImage(image) {
      let response;
      let params = {
        image: image,
        user: this.user.pk
      }
      if (this.user.profile) { // has profile in DB
        params.id = this.user.profile.id
        response = await this.$store.dispatch("user/updateProfileImage", params)
      } else {
        response = await this.$store.dispatch("user/uploadProfileImage", params)
      }
      this.$store.commit('user/setUserProfile', response)
      this.forceRenderImgDisplay()
    },
    async on_confirm(_from, e) {
      if (_from === 'user_profile' && e) {
        await this.updateProfile()
      } else if (_from === 'change_password' && e) {
        await this.updatePassword()
      }
    },
    async updateProfile() {
      let response = await this.$store.dispatch('user/updateUser', this.user)
    },
    async updatePassword() {
      let response = await this.$store.dispatch('user/changePassword', this.change_password_form)
    }

  }
}
</script>

<style scoped>

</style>