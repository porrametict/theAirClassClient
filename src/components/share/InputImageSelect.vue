<template>
    <div class="fill-height d-flex align-center">
        <div class="image-upload">
            <label for="file-input" style="cursor: pointer">
                <v-icon>mdi-file-image-outline</v-icon>
            </label>
            <input id="file-input" ref="file" @change="uploadImage($event)" type="file" accept="image/*"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputImageSelect",
        methods: {
            uploadImage(event) {
                let input = event.target;
                if (input.files && input.files[0]) {
                    this.$emit('change', input.files[0])
                }
            },
        }

    }
</script>

<style scoped>
    .image-upload > input {
        display: none;
    }


</style>