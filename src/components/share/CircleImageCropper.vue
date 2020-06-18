<template>
    <div class="d-flex justify-center">
        <slot name="activator" :on="on">
            <ButtonPrimary v-on="on">
                Select
            </ButtonPrimary>
        </slot>
        <v-dialog v-if="dialog" v-model="dialog" persistent max-width="1000" scrollable>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-baseline primary pa-2 px-4">
                    <p class="pa-0 ma-0"> Select Image</p>
                    <v-btn icon class="pa-0 ">
                        <v-icon @click="dialog = !dialog">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="">
                    <div class="d-flex align-center justify-center">
                        <Cropper v-if="image"
                                 class="ma-2"
                                 ref="cropper"
                                 classname="upload-example-cropper"
                                 :src="image"
                                 :stencilComponent="$options.components.CircleStencil"
                        />
                        <div v-else style="width: 25em ;height: 25em " class="d-flex align-center justify-center">
                            <p class="grey--text display-1">
                                No Image.
                            <p/>
                        </div>
                    </div>
                    <div>
                        <input type="file" ref="file" @change="uploadImage($event)" accept="image/*"
                               style="display: none">
                    </div>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-around mb-2">
                    <v-btn @click="$refs.file.click()" color="green" outlined rounded >
                        <span class="px-2">
                        choose image
                        </span>
                    </v-btn>
                    <ButtonPrimary text="select" @click="crop">
                    </ButtonPrimary>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import {CircleStencil, Cropper} from 'vue-advanced-cropper'
    import ButtonPrimary from "./ButtonPrimary";

    export default {
        name: "CircleImageCropper",
        props: {
            imageURL: {
                type: String,
                required: false,
                default: null
            }
        },
        mounted() {
            this.image = this.imageURL
        },
        data() {
            return {
                on: {
                    click: this.switch_dialog,
                },
                dialog: false,
                image: null
            }
        },
        components: {
            ButtonPrimary,
            Cropper,
            CircleStencil
        },
        methods: {
            switch_dialog() {
                this.dialog = !this.dialog
            },
            uploadImage(event) {
                // Reference to the DOM input element
                var input = event.target;
                // Ensure that you have a file before attempting to read it
                if (input.files && input.files[0]) {
                    // create a new FileReader to read this image and convert to base64 format
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.image = e.target.result;
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[0]);
                }
            },
            crop() {
                const {coordinates, canvas} = this.$refs.cropper.getResult()
                this.coordinates = coordinates
                // You able to do different manipulations at a canvas
                // but there we just get a cropped image
                this.image = canvas.toDataURL()
                this.sendOutput()
            },
            sendOutput() {
                let imageBlob = this.dataURLToBlob(this.image)
                let image = this.blobToFile(imageBlob, 'new_image.png')
                this.$emit("getOutput", image)
                this.dialog = false
            },
            dataURLToBlob: function (dataURL) {
                let BASE64_MARKER = ';base64,';
                if (dataURL.indexOf(BASE64_MARKER) == -1) {
                    let parts = dataURL.split(',');
                    let contentType = parts[0].split(':')[1];
                    let raw = decodeURIComponent(parts[1]);
                    return new Blob([raw], {type: contentType});
                }
                let parts = dataURL.split(BASE64_MARKER);
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;
                let uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {type: contentType});
            },
            blobToFile(theBlob, fileName) {
                return new File([theBlob], fileName, {lastModified: Date.now(), type: 'image/png'});
            }
        }
    }
</script>
<style scoped>
</style>
