<template>
    <div>
        <div>
            <Cropper
                    ref="cropper"
                    classname="upload-example-cropper"
                    :src="image"
                    :stencilComponent="$options.components.CircleStencil"
            />
            <div class="button-wrapper">
			<span class="button" @click="$refs.file.click()">
				<input type="file" ref="file" @change="uploadImage($event)" accept="image/*">
				Upload image
			</span>
                <button @click="crop">
                    Crop
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import {CircleStencil, Cropper} from 'vue-advanced-cropper'

    export default {
        name: "CircleImageCropper",
        data() {
            return {
                image: null,
            }
        },
        components: {
            Cropper,
            CircleStencil
        },
        methods: {
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
    .upload-example-cropper {
        border: solid 1px #EEE;
        height: 480px;
        width: 480px;
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 17px;
    }

    .button {
        color: white;
        font-size: 16px;
        padding: 10px 20px;
        background: #3fb37f;
        cursor: pointer;
        transition: background 0.5s;
    }

    .button:hover {
        background: #38d890;
    }

    .button input {
        display: none;
    }
</style>
