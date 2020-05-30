<template>
    <div>
        <v-btn @click="$router.push({name : 'EditProfile'})">goto Edit Profile</v-btn>
        <h1>Student Profile</h1>
        <h2> Page will show User Information and Calendar.</h2>

        <StencilImageCropper @getOutput="uploadImage"></StencilImageCropper>
    </div>
</template>

<script>
    import StencilImageCropper from "../../../components/share/CircleImageCropper";

    export default {
        name: "UserProfile",
        components: {StencilImageCropper},
        data: () => ({
            selectedFile: null
        }),
        methods: {
            async uploadImage(image) {
                console.log(image)
                let params = {
                    image: image,
                    user: 1
                }
                let response = this.$store.dispatch("user/uploadProfileImage", params)
            }
        }

    }
</script>

<style scoped>

</style>
