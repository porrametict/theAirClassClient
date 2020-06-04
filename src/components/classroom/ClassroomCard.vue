<template>
    <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
    >
        <v-card
                width="300"
                height="250"
                :elevation="hover ? 16 : 2"
        >
            <v-card-text class="d-flex flex-column fill-height">
                <div class="text-center flex-grow-1">
                    <div class="d-flex justify-center">
                        <ClassroomImageDisplay
                                :classroom="classroom"
                                width="60"
                                height="60"
                                class="ma-2"
                        >
                        </ClassroomImageDisplay>
                    </div>
                    <div>
                        <p class="title text-truncate">
                            {{classroom.name}}
                        </p>
                        <p class="text-start text-truncate">
                            {{classroom.detail}}
                        </p>
                    </div>
                </div>
                <div class="text-center">
                    <v-divider class="ma-2"></v-divider>
                    <ButtonPrimary
                            text="join"
                            :block="true"
                            @click="$router.push({name : 'BoardClassroom', params :{id : classroom.id} })"
                    >
                    </ButtonPrimary>
                </div>
            </v-card-text>
        </v-card>
    </v-hover>

</template>

<script>
    import ButtonPrimary from "../share/ButtonPrimary";
    import ClassroomImageDisplay from "./ClassroomImageDisplay";

    export default {
        name: "ClassroomCard",
        components: {ClassroomImageDisplay, ButtonPrimary},
        props: {
            classroom: {
                type: Object,
                require: true
            }
        }
    }
</script>

<style scoped>

</style>