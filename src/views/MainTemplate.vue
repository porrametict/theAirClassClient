<template>
    <v-app>
        <Navbar />
        <v-content>
            Main
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Navbar from "../components/Navbar";
    export default {
        name: "MainTemplate",
        created () {
            alert("man")
        },
        components: {
            Navbar
        },
        data :() =>({

        })
    }
</script>

<style scoped>
    .border{
        border-left: 4px solid #2c3e50;
    }

</style>