<template>
    <div class="fill-height overflow-hidden" v-if="room">
        <v-row style="box-sizing: border-box" class="fill-height">
            <v-col cols="9">
                <div>
                    <ScreenSharing></ScreenSharing>
                </div>

            </v-col>
            <v-col cols="3">
                <Chat
                        :room="room"
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
                room: null,
                classroom_id: this.$route.params.id
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData() {
                this.room = await this.$store.dispatch('classroom/room/getRoom', this.$route.params.room_id)
            }
        }
    }
</script>

<style scoped>

</style>