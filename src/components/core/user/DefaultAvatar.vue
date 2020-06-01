<template>
    <v-img
            :class="circle ? 'circle-rounded' : '' "
            :width="width"
            :height="height"
            class="image_relative grey"
    >
        <div
                :class="font_size_class"
                class="text_center_on_image
                        white--text
                        d-flex justify-center align-center
                        text-uppercase
                        ">
            <span>{{name}}</span>
        </div>
    </v-img>
</template>

<script>
    export default {
        name: "DefaultAvatar",
        props: {
            first_name: {
                type: String,
                require: true,
            },
            last_name: {
                type: String,
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
            font_size_class: {
                type: String,
                require: false,
                default: 'display-2'
            },
            circle: {
                type : [String,Boolean],
                require : false,
                default : false
            }

        },
        data() {
            return {
                name: null
            }
        },
        created() {
            this.name = this.getFirstCharacter(this.first_name) + this.getFirstCharacter(this.last_name)
        },
        methods: {
            getFirstCharacter(str) {
                if (str.length > 1) {
                    return str.substr(0, 1)
                } else {
                    return str
                }
            }
        }
    }
</script>

<style scoped>
    .text_center_on_image {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .image_relative {
        position: relative;
    }
    .circle-rounded {
        border-radius: 50%;
    }

</style>