<template>
    <div>
        <v-img :class="circle ? 'circle-rounded' : '' "
               v-if="user.profile && ( user.profile.image && user.profile.image !== '') "
               :height="height"
               :width="width"
               :src="user.profile.image"
        >
        </v-img>
        <DefaultAvatar v-else
                       :first_name="user.first_name"
                       :last_name="user.last_name"
                       :height="height"
                       :width="width"
                       :circle="circle"
                       :font_size_class="font_size_class"
        >
        </DefaultAvatar>
    </div>
</template>

<script>
    import DefaultAvatar from "./DefaultAvatar";

    export default {
        name: "ImageProfile",
        components: {DefaultAvatar},
        props: {
            font_size_class: {
                type: String,
                require: false,
                default: 'display-2'
            },
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
            circle: {
                type: [String, Boolean],
                require: false,
                default: false
            }
        }
    }
</script>

<style scoped>

    .circle-rounded {
        border-radius: 50%;
    }

</style>