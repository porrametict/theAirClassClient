<template>
    <div>
        <slot name="activator" :on="on">
            <ButtonPrimary v-on="on">{{text_btn}}</ButtonPrimary>
        </slot>
        <v-dialog
                v-model="dialog"
                max-width="500"
        >
            <v-card>
                <v-card-title class="headline text-center d-flex flex-column">
                    <div class="text-center mb-2">
                        <v-icon  class="display-4" color="primary" >
                            mdi-help
                        </v-icon>
                    </div>
                    <div>
                        {{message}}
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="grey"
                            text
                            @click="confirm_cancel"
                    >{{no_text}}
                    </v-btn>
                    <v-btn
                            color="primary"
                            text
                            @click="confirm_success"
                    >{{yes_text}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import ButtonPrimary from "./ButtonPrimary";

    export default {
        name: "ConfirmDialog",
        components: {ButtonPrimary},
        props: {
            message: {
                type: String,
                require: false,
                default: "Are you sure?"
            },
            yes_text: {
                type: String,
                require: false,
                default: 'yes'
            },
            no_text: {
                type: String,
                require: false,
                default: 'no'
            },
            text_btn: {
                type: String,
                require: false,
                default: "Confirm"
            }
        },
        data() {
            return {
                on: {
                    click: this.switch_dialog,
                },
                dialog: false
            }
        },
        methods: {
            switch_dialog() {
                this.dialog = !this.dialog

            },
            confirm_success() {
                this.$emit("change", true)
                this.dialog = !this.dialog
            },
            confirm_cancel() {
                this.$emit("change", false)
                this.dialog = !this.dialog
            }
        }
    }
</script>

<style scoped>

</style>