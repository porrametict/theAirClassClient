<template>
    <div>
        <v-btn @click="$router.push({name : 'EditProfile'})">goto Edit Profile</v-btn>
        <h1>Student Profile</h1>
        <h2> Page will show User Information and Calendar.</h2>
    </div>
</template>

<script>
    export default {
        name: "UserProfile",
        data: () => ({

        }),

    }
</script>

<style scoped>

</style>
