<template>
    <div v-if="user">
        <!--header-->
        <div>
            <p>
                <v-icon class="mx-2" color="primary">
                    mdi-account
                </v-icon>
                <span class="title">Profile</span>
            </p>
            <v-divider></v-divider>
        </div>
        <!--        <v-divider class="mx-2"></v-divider>-->


        <!-- header-->
        <div class="my-2 d-flex">
            <div class="d-flex align-start">
                <div>
                    <v-img
                            v-if="user.profile && ( user.profile.image && user.profile.image !== '') "
                            height="150"
                            width="150"
                            class="flex-grow-0 ma-4"
                            :src="user.profile.image">
                    </v-img>
                    <DefaultAvatar v-else
                                   class="flex-grow-0 ma-4"
                                   :first_name="user.first_name"
                                   :last_name="user.last_name"
                    ></DefaultAvatar>
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
                <v-btn
                        @click="$router.push({name : 'EditProfile'})"
                        icon
                        outlined
                >
                    <v-icon>
                        mdi-account-edit
                    </v-icon>
                </v-btn>

            </div>
        </div>

        <v-divider></v-divider>

        <!--body-->
        <div class="d-flex justify-center align-center display-4 grey--text" >
            Coming Soon .

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import DefaultAvatar from "../../../components/core/user/DefaultAvatar";

    export default {
        name: "UserProfile",
        components: {DefaultAvatar},
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
