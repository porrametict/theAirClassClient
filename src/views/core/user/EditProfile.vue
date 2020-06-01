<template>
    <div>
        <!-- edit User Profile-->
        <div v-if="user">
            <!--header-->
            <div>
                <p>
                    <v-icon class="mx-2" color="primary">
                        mdi-account-edit
                    </v-icon>
                    <span class="title">Edit Profile</span>
                </p>
                <v-divider></v-divider>
            </div>
            <div class="ma-8">
                <div class="d-flex justify-space-around  flex-wrap">
                    <!-- image-->
                    <v-card class="d-flex flex-column align-center" min-width="400" elevation="0">
                        <v-img :key="VImgComponentKey"
                               v-if="user.profile && ( user.profile.image && user.profile.image !== '') "
                               height="200"
                               width="200"
                               class="flex-grow-0 ma-4"
                               :src="user.profile.image">
                        </v-img>
                        <DefaultAvatar v-else
                                       class="flex-grow-0 ma-4"
                                       :first_name="user.first_name"
                                       :last_name="user.last_name"
                        ></DefaultAvatar>
                        <circle-image-cropper :key="ImageCropperComponentKey" :imageURL="user.profile.image"
                                              @getOutput="updateImage">
                            <template v-slot:button_area>
                                <v-btn class="primary black--text">
                                    edit
                                </v-btn>
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
                                    label="Firstname"
                                    outlined
                                    v-model="user.first_name"
                            >
                            </v-text-field>
                        </div>
                        <div>
                            <v-text-field
                                    label="Lastname"
                                    outlined
                                    v-model="user.last_name"
                            >
                            </v-text-field>
                        </div>
                        <div>
                            <v-text-field
                                    label="E-mail"
                                    readonly
                                    outlined
                                    v-model="user.email"
                            >
                            </v-text-field>
                        </div>

                    </v-card>
                </div>
            </div>
            <!--button-->
            <div class="ma-5">
                <div class="d-flex justify-space-around flex-wrap">
                    <v-btn
                            rounded
                            color="gary"
                            class="black--text"
                            @click="$router.push({name : 'Profile'})"
                    >CANCEL
                    </v-btn>
                    <ConfirmDialog @onGetConfirmResult="on_confirm('user_profile',$event)"
                                   :switch_dialog_btn="{color: 'primary',text: 'Confirm ? ',is_icon: false,is_rounded: true}">
                        <template v-slot:btn>
                            <span class="black--text">Save</span>
                        </template>
                    </ConfirmDialog>
                </div>
            </div>
        </div>

        <v-divider class="my-2"></v-divider>

        <!-- Change Password-->
        <div>
            <!--header-->
            <div>
                <p>
                    <v-icon class="mx-2" color="primary">
                        mdi-lock
                    </v-icon>
                    <span class="title">Change Password
                        <span class="red--text">
                            (unusable)
                        </span>
                    </span>
                </p>
                <v-divider></v-divider>
            </div>
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
                                v-model="change_password_form.password"
                                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show_password ? 'text' : 'password'"
                                name="input-10-1"
                                label="New Password"
                                counter
                                @click:append="show_password = !show_password"
                        ></v-text-field>
                        <v-text-field
                                outlined
                                v-model="change_password_form.password2"
                                :append-icon="show_password_confirmed ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show_password_confirmed ? 'text' : 'password'"
                                name="input-10-1"
                                label="Confirm Password"
                                counter
                                @click:append="show_password_confirmed = !show_password_confirmed"
                        ></v-text-field>
                    </v-card>
                </div>
            </div>

            <!--button-->
            <div class="ma-5">
                <div class="d-flex justify-space-around flex-wrap">
                    <v-btn
                            rounded
                            color="gary"
                            class="black--text"
                            @click="$router.push({name : 'Profile'})"
                    >CANCEL
                    </v-btn>
                    <ConfirmDialog @onGetConfirmResult="on_confirm('change_password',$event)"
                                   :switch_dialog_btn="{color: 'primary',text: 'Confirm ? ',is_icon: false,is_rounded: true}">
                        <template v-slot:btn>
                            <span class="black--text">Save</span>
                        </template>
                    </ConfirmDialog>
                </div>
            </div>

        </div>
    </div>

</template>


<script>
    import CircleImageCropper from "../../../components/share/CircleImageCropper";
    import {mapState, mapMutations} from 'vuex'
    import DefaultAvatar from "../../../components/core/user/DefaultAvatar";
    import ConfirmDialog from "../../../components/share/ConfirmDialog";

    export default {
        name: "UserEditProfile",
        components: {ConfirmDialog, DefaultAvatar, CircleImageCropper},
        data() {
            return {

                VImgComponentKey: 0,
                ImageCropperComponentKey: 1,


                change_password_form: {
                    password: "",
                    password2: ""
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

            }

        }
    }
</script>

<style scoped>

</style>