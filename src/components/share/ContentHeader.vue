<template>
    <div class="">
        <div class="d-flex my-2">
            <v-icon class="mx-2" color="primary">
                {{icon}}
            </v-icon>
            <span class="title">
                <slot>
                {{text}}
                </slot>
            </span>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>
    export default {
        name: "ContentHeader",
        props: {
            icon: {
                type: String,
                require: false,
                default: 'mdi-circle'
            },
            text: {
                type: String,
                require: true
            }
        }
    }
</script>

<style scoped>

</style>