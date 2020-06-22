<template>
    <div class="d-flex fill-height" >
        <Navbar/>
        <v-content  class="fill-height" :style="{background: $vuetify.theme.themes.light.background}">
            <v-layout class=" pa-6 fill-height">
                <v-container class="white rounded" >
                    <router-view/>
                </v-container>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
    import Navbar from "../../components/Navbar";
    import {mapState} from 'vuex'

    export default {
        name: "MainTemplate",
        components: {
            Navbar
        },
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
    .rounded{
        border-radius: 2em;
    }

</style>