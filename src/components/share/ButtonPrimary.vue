<template>
    <v-btn
            class="black--text"
            :color="color"
            rounded
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