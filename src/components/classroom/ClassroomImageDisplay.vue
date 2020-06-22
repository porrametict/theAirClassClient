<template>
    <div>
        <v-img :class="circle ? 'circle-rounded' : '' "
               v-if="classroom.image  && classroom.image !== '' "
               :height="height"
               :width="width"
               :src="classroom.image"
        >
        </v-img>
        <ClassroomDefaultImage
                v-else
                :text="classroom.name"
                :height="height"
                :width="width"
                :circle="circle"
        >
        </ClassroomDefaultImage>

    </div>

</template>

<script>
    import ClassroomDefaultImage from "./ClassroomDefaultImage";

    export default {
        name: "ClassroomImageDisplay",
        components: {ClassroomDefaultImage},
        props: {
            classroom: {
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
        },
    }
</script>

<style scoped>

    .circle-rounded {
        border-radius: 50%;
    }

</style>