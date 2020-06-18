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
        name: "ClassroomDefaultImage",
        props: {
            text: {
                type: String,
                require: true,
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
                default: 'display-1'
            },
            circle: {
                type: [String, Boolean],
                require: false,
                default: false
            }
        },
        data() {
            return {
                name: null
            }
        },
        created() {
            if (this.text) {
                this.getName()
            } else {
                this.name = "??"
            }

        }
        ,
        methods: {
            getFirstCharacter(str) {
                if (str.length > 1) {
                    return str.substr(0, 1)
                } else {
                    return str
                }
            },
            getName() {
                let splited_text = this.text.split(" ")
                if (splited_text.length === 1) {
                    this.name = this.getFirstCharacter(splited_text[0])
                } else if (splited_text.length > 1) {
                    this.name = this.getFirstCharacter(splited_text[0]) + this.getFirstCharacter(splited_text[1])
                } else {
                    this.name = "??"
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