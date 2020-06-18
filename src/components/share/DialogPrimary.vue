<template>
    <div>
        <slot name="open_btn" :on="open_btn_on" v-if="use_open_button">
            <ButtonPrimary v-on="open_btn_on">open</ButtonPrimary>
        </slot>
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <slot name="head" :on="head_on">
                    <v-card-title class="primary">
                        <p class="ma-0 pa-0">{{title}}</p>
                        <v-spacer></v-spacer>
                        <v-btn icon v-on="head_on">
                            <v-icon>
                                mdi-close
                            </v-icon>
                        </v-btn>
                    </v-card-title>
                </slot>

                <v-card-text class="ma-0 pa-0">
                    <slot>
                        <p class="display-4 text-center">
                            No Content.
                        </p>
                    </slot>
                    <v-divider></v-divider>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-around" v-if="!hide_action_btn">
                    <slot name="left_btn" :on="secondary_btn_on" v-if="double_action_btn">
                        <ButtonCancel v-on="secondary_btn_on">no</ButtonCancel>
                    </slot>
                    <slot name="right_btn" :on="primary_btn_on">
                        <ButtonPrimary v-on="primary_btn_on">yes</ButtonPrimary>
                    </slot>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import ButtonCancel from "./ButtonCancel";
    import ButtonPrimary from "./ButtonPrimary";
    import {EventBus} from "../../event-bus";

    export default {
        name: "DialogPrimary",
        props: {
            double_action_btn: {
                type: Boolean,
                require: false,
                default: false
            },
            hide_action_btn: {
                type: Boolean,
                require: false,
                default: false
            },
            use_open_button: {
                type: Boolean,
                require: false,
                default: false
            },
            title: {
                type: String,
                require: false,
                default: 'dialog'
            }
        },
        mounted() {
            EventBus.$on('open-dialog-primary', () => {
                this.dialog = !this.dialog
                EventBus.$off('my-event-name');
            });
        },
        components: {ButtonPrimary, ButtonCancel},
        data() {
            return {
                dialog: false,
                head_on: {
                    click: this.switch_dialog,
                },
                open_btn_on: {
                    click: this.switch_dialog,
                },
                primary_btn_on: {
                    click: this.primary_btn_click,
                },
                secondary_btn_on: {
                    click: this.secondary_btn_click,
                },
            }
        }, methods: {
            switch_dialog() {
                this.dialog = !this.dialog
            },
            primary_btn_click() {
                this.$emit('primary_btn_click')
                this.switch_dialog()

            },
            secondary_btn_click() {
                this.$emit('secondary_btn_click')
                this.switch_dialog()
            }
        }
    }
</script>

<style scoped>

</style>