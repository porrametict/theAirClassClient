<template>
    <div>
        <p>
            <v-icon class="mx-2" color="primary">
                {{icon}}
            </v-icon>
            <span class="title">
                <slot name="text">
                {{text}}
                </slot>
            </span>
        </p>
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