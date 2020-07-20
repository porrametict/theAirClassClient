<template>
    <div>
        <v-img @click="switchDialog"
               style="cursor: pointer"
               width="150"
               v-if="data.content_type === 'image'"
               :src="data.image_url"
        >
        </v-img>
        <v-dialog
                v-model="dialog"
                width="700"
        >
            <div>
                <v-img
                        v-if="data.content_type === 'image'"
                        :src="data.image_url"
                >
                </v-img>
            </div>
        </v-dialog>

    </div>
</template>

<script>

    export default {
        name: "ImageMessage",
        props: {
            data: {
                type: Object,
                require: true,
            },
            width: {
                type: String,
                require: false,
                default: "100"
            }
        },
        data: () => ({
            dialog: false,
        }),
        methods: {
            switchDialog() {
                console.log("clieck")
                this.dialog = !this.dialog
            }
        }
    }
</script>

<style scoped>

</style>