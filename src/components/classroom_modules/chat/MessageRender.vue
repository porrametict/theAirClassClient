<template>
    <div v-if="user.pk === data.user.pk" class="d-flex ml-auto">
        <v-card class="my-1 mx-2" outlined>
            <v-card-text class="orange lighten-2 ">
                <p class="display-1 ma-0 pa-0">{{data.content.message}}</p>
                <p class="title ma-0 pa-0 text-end">{{data.content.timestamp}}</p>
            </v-card-text>
        </v-card>
    </div>

    <div class="d-flex mr-auto " v-else>
        <div class="d-flex flex-row align-center">
            <ImageProfile :user="data.user"
                          :circle="true"
                          width="50"
                          height="50"
                          font_size_class="title"
            ></ImageProfile>
            <v-card outlined class="my-1 mx-2">
                <v-card-text class="grey lighten-2">
                    <p class="display-1 ma-0 pa-0">{{data.content.message}}</p>
                    <p class="title ma-0 pa-0  ">{{data.content.timestamp}}</p>
                </v-card-text>
            </v-card>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ImageProfile from "../../core/user/ImageProfile";

    export default {
        name: "MessageRender",
        components: {ImageProfile},
        props: {
            data: {
                type: Object
            }
        },
        async mounted() {
            if (!this.user) {
                await this.$store.dispatch('user/getUser')
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        }
    }
</script>

<style scoped>

</style>