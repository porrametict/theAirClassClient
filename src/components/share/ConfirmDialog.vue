<template>
    <div>
        <v-btn @click="dialog = !dialog"
               :icon="switch_dialog_btn.is_icon"
               :color="switch_dialog_btn.color"
               :rounded="switch_dialog_btn.is_rounded"
               :outlined="switch_dialog_btn.is_outlined"
        >
            <slot name="btn">
                {{ switch_dialog_btn.text}}
            </slot>
        </v-btn>

        <v-dialog
                v-model="dialog"
                max-width="400"
        >
            <v-card>
                <v-card-title class="headline text-center">{{message}}</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            :color="no_btn.color"
                            text
                            @click="confirm_cancel"
                    >{{no_btn.text}}
                    </v-btn>
                    <v-btn
                            :color="yes_btn.color"
                            text
                            @click="confirm_success"
                    >{{yes_btn.text}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "ConfirmDialog",
        props: {
            message: {
                type: String,
                require: false,
                default: "Are you sure?"
            },
            yes_btn: {
                type: Object,
                require: false,
                default: () => ({
                    color: "primary",
                    text: "Yes"
                })
            },
            no_btn: {
                type: Object,
                require: false,
                default: () => ({
                    color: "grey",
                    text: "No"
                })
            },
            switch_dialog_btn: {
                type: Object,
                require: false,
                default: () => ({
                    color: 'primary',
                    text: 'Confirm ? ',
                    is_icon: false,
                    is_rounded: false,
                    is_outlined: false,
                })
            }
        },
        data() {
            return {
                dialog: false
            }
        },
        methods: {
            confirm_success() {
                this.$emit("onGetConfirmResult", true)
                this.dialog = !this.dialog
            },
            confirm_cancel() {
                this.$emit("onGetConfirmResult", false)
                this.dialog = !this.dialog
            }
        }
    }
</script>

<style scoped>

</style>