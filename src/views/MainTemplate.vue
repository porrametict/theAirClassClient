<template>
    <div>
        <!--        menu-->
        <div>

        </div>

        <!--        content-->
        <div v-if="user">
            {{this.user}}
            <router-view></router-view>
        </div>

    </div>
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

</style>