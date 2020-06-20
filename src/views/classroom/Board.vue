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
                <v-btn
                        class="mx-2"
                        icon
                        outlined
                        @click="$router.push({name : 'MainClassroom'})"
                >
                    <v-icon>
                        mdi-dots-horizontal
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <v-divider class="my-2"></v-divider>
        <!--body-->
        <div>
            <v-col cols="12"  class="d-flex justify-end ">

                <v-btn
                        color="primary"
                        class="black--text"
                        @click="$router.push({name : 'SteamsClassroom'})"
                >
                    Steam
                </v-btn>
            </v-col>
            <p class="display-4 text-center grey--text">Coming Soon.</p>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ClassroomBoard",
        data() {
            return {
                img_url: "https://png.pngtree.com/png-clipart/20190903/original/pngtree-a-stack-of-books-and-plants-together-png-image_4429927.jpg"
            }
        }
    }
</script>

<style scoped>

</style>
