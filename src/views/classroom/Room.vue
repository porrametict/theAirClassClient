<template>
    <div class="fill-height">
        this is a room page.
        <div class="d-flex fill-height ">
            <ScreenSharing></ScreenSharing>
            <Chat room-id="155432415" :classroom-id="classroom_id"></Chat>
        </div>
    </div>
</template>

<script>
    import ScreenSharing from "../../components/classroom_modules/screensharing/ScreenSharing";
    import Chat from "../../components/classroom_modules/chat/Chat";

    export default {
        name: "ClassroomRoom",
        components: {Chat, ScreenSharing},
        data() {
            return {
                classroom_id: this.$route.params.id
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>