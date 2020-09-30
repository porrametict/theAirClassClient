<template>
    <div v-if="user">
        <!--header-->
        <div>
          <ContentHeader icon="mdi-account" text="Profile"></ContentHeader>
        </div>

        <!-- body header-->
        <div class="my-2 d-flex">
            <div class="d-flex align-start">
                <div>
                    <ImageProfile :user="user" height="150" width="150"></ImageProfile>
                </div>
                <div>
                    <div class="headline ">
                        <span class="mx-2">{{user.first_name}}</span>
                        <span class="mx-2">{{user.last_name}}</span>
                    </div>
                    <div>
                        <p class="mx-2 ma-0 "> username : {{user.username}}</p>
                        <p class="mx-2 ma-0"> email : {{user.email}}</p>
                    </div>
                </div>

            </div>

            <div>
                <ButtonIcon
                        icon="mdi-account-edit"
                        tooltip_text="edit profile"
                        @click="$router.push({name : 'EditProfile'})"
                ></ButtonIcon>
            </div>
        </div>

        <v-divider></v-divider>

        <!--body content-->
        <div class="d-flex justify-center align-center display-4 grey--text">
            Coming Soon .

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import DefaultAvatar from "../../../components/core/user/DefaultAvatar";
    import ImageProfile from "../../../components/core/user/ImageProfile";
    import ContentHeader from "../../../components/share/ContentHeader";
    import ButtonIcon from "../../../components/share/ButtonIcon";

    export default {
        name: "UserProfile",
        components: {ButtonIcon, ContentHeader, ImageProfile, DefaultAvatar},
        data: () => ({}),
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {}

    }
</script>

<style scoped>

</style>
