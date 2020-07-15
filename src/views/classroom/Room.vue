<template>
    <div class="fill-height overflow-hidden">
        <v-row style="box-sizing: border-box" class="fill-height">
            <v-col cols="9">
                <div>
                    <ScreenSharing></ScreenSharing>
                </div>

            </v-col>
            <v-col cols="3" >
                <Chat
                        room-id="155432415"
                        :classroom-id="classroom_id"
                ></Chat>
            </v-col>
        </v-row>
        <div class="d-flex fill-height ">
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