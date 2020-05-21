<template>
    <div class="d-flex justify-center align-center fill-height">
        <div class="text-center">
            <p class="display-1 font-weight-black">Join Class</p>
            <v-text-field
                    placeholder="enter classroom code"
                    filled
                    rounded
                    dense
            >
            </v-text-field>
            <v-btn rounded color="primary" class="black--text" large>
                join new classroom
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClassroomJoin",
        data: () => ({})
    }
</script>

<style scoped>

</style>
