<template>
    <v-btn
            class="black--text"
            :color="color"
            rounded
            :block="block"
            @click="on_click"
    >
        <span class="px-2">
        {{text}}
        </span>
    </v-btn>
</template>

<script>
    export default {
        name: "ButtonPrimary",
        props: {
            color: {
                type: String,
                require: false,
                default: 'primary'
            },
            text: {
                type: String,
                require: true,
            },
            block: {
                type: [Boolean, String],
                require: false,
                default: false
            }

        },
        methods: {
            on_click() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>

</style>