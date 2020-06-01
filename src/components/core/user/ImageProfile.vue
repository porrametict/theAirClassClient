<template>
    <div>
        <v-img
                v-if="user.profile && ( user.profile.image && user.profile.image !== '') "
                :height="height"
                :width="width"
                :src="user.profile.image">
        </v-img>
        <DefaultAvatar v-else
                       :first_name="user.first_name"
                       :last_name="user.last_name"
                       :height="height"
                       :width="width"
        ></DefaultAvatar>
    </div>
</template>

<script>
    import DefaultAvatar from "./DefaultAvatar";

    export default {
        name: "ImageProfile",
        components: {DefaultAvatar},
        props: {
            user: {
                type: Object,
                require: true
            },
            height: {
                type: [Number, String],
                require: false,
                default: 200
            },
            width: {
                type: [Number, String],
                require: false,
                default: 200
            },
        }
    }
</script>

<style scoped>

</style>