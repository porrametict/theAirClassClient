<template>
    <v-btn
            :color="color"
            rounded
            class="black--text"
            @click="on_click"
    >
        <slot>
            {{text}}
        </slot>
    </v-btn>
</template>

<script>
    export default {
        name: "ButtonSubmit",
        props: {
            color: {
                type: String,
                require: false,
                default: 'primary'
            },
            text: {
                type: String,
                require: false,
                default: "save"
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