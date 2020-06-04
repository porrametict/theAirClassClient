<template>
    <v-btn
            class="black--text"
            :color="color"
            rounded
            @click="on_click"
    >
        {{text}}
    </v-btn>
</template>

<script>
    export default {
        name: "ButtonCancel",
        props: {
            color: {
                type: String,
                require: false,
                default: 'grey lighten-4'
            },
            text: {
                type: String,
                require: false,
                default: "cancel"
            }

        },
        methods : {
            on_click() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>

</style>