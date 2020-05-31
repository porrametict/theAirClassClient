<template>
    <div v-if="user">
        <div class="ma-8">
            <div class="d-flex justify-space-around  flex-wrap">
                <!-- image-->
                <div class="d-flex flex-column align-center">
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
                    <circle-image-cropper :imageURL="user.profile.image" @getOutput="updateImage">
                        <template v-slot:button_area>
                            <v-btn class="primary black--text">
                                edit
                            </v-btn>
                        </template>
                    </circle-image-cropper>
                </div>
                <!--details-->
                <div class="ma-5">
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
                    <div>
                        <div class=" text-center text-md-end">
                            <p>
                                <router-link to="/user/edit-password">Edit Password?</router-link>
                            </p>
                        </div>
                    </div>
                </div>
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
                <ConfirmDialog @onGetConfirmResult="on_confirm"
                        :switch_dialog_btn="{color: 'primary',text: 'Confirm ? ',is_icon: false,is_rounded: true}">
                    <template v-slot:btn>
                        <span class="black--text">Save</span>
                    </template>
                </ConfirmDialog>
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
                dialog: false,
                dialog2: false,
                selectedFile: null,
                show1: false,
                password: 'Password',
                VImgComponentKey: 0
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            }),
        },
        methods: {
            forceRenderVImg() {
                this.VImgComponentKey += 1
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
                this.user.profile = response
                this.forceRenderVImg()
            },
            async on_confirm(e) {
                if (e) { // yes in confirm
                    let response = await this.$store.dispatch('user/updateUser', this.user)
                }
                console.log(e, 're')
            },

        }
    }
</script>

<style scoped>

</style>