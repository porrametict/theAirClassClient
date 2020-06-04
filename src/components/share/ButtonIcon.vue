<template>
    <div>
        <v-tooltip top >
            <template v-slot:activator="{ on }">
                <v-btn
                        v-on="on"
                        @click="on_click"
                        icon
                        :outlined="outlined"
                >
                    <v-icon>
                        {{icon}}
                    </v-icon>
                </v-btn>

            </template>
            <span>{{tooltip_text}}</span>
        </v-tooltip>
    </div>

</template>

<script>
    export default {
        name: "ButtonIcon",
        props: {
            outlined: {
                type: [String, Boolean],
                require: false,
                default: true
            },
            color: {
                type: String,
                require: false,
                default: 'grey'
            },
            icon: {
                type: String,
                require: true
            },
            tooltip_text: {
                type: String,
                require: true,
            }
        },
        methods: {
            on_click() {
                this.$emit("click")
            }
        }
    }
</script>

<style scoped>

</style>