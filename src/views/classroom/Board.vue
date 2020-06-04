<template>
    <div>
        <!-- header-->
        <div class="d-flex justify-start">
            <v-img
                    :src="img_url"
                    max-width="50"
                    class="mx-2"
            >

            </v-img>
            <div class="d-flex justify-space-between" style="width: 100%">
                <p class="display-1 font-weight-bold">
                    Usage of Thai Language
                </p>
                <ButtonIcon class="mx-2"
                            icon="mdi-dots-horizontal"
                            @click="$router.push({name : 'MainClassroom'})"
                            tooltip_text="manage classroom"
                >
                </ButtonIcon>
            </div>
        </div>
        <v-divider class="my-2"></v-divider>
        <!--body-->
        <div>
            <p class="display-4 text-center grey--text">Coming Soon.</p>
        </div>
    </div>
</template>

<script>
    import ButtonIcon from "../../components/share/ButtonIcon";

    export default {
        name: "ClassroomBoard",
        components: {ButtonIcon},
        data() {
            return {
                img_url: "https://png.pngtree.com/png-clipart/20190903/original/pngtree-a-stack-of-books-and-plants-together-png-image_4429927.jpg"
            }
        }
    }
</script>

<style scoped>

</style>