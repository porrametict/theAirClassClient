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
    import {mapState} from 'vuex'

    export default {
        name: "MainTemplate",
        mounted() {
            this.checkHasUser()
        },
        data() {
            return {}
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {
            async checkHasUser() {
                if (!this.user) {
                    let data = await this.$store.dispatch('user/getUser')
                    if (!data) {
                        alert("Please Login.")
                        this.$router.push({
                            name: 'Login'
                        })
                    }
                }

            }
        }
    }
</script>

<style scoped>
    .border{
        border-left: 4px solid #2c3e50;
    }

</style>