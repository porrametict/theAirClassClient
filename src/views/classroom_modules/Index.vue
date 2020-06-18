<template>
    <div>
        <ContentHeader text="App" icon="mdi-view-dashboard"></ContentHeader>
        <div class="ma-5">
            <v-card width="200" @click="router_push('MemberIndex')">
                <v-card-title class="d-flex flex-column">
                    <v-icon>mdi-account</v-icon>
                    <p>Member</p>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
    import ContentHeader from "../../components/share/ContentHeader";

    export default {
        name: "ClassroomModuleIndex",
        components: {ContentHeader},
        methods : {
            router_push(name) {
                if (this.$router.currentRoute.name !== name) {
                    this.$router.replace({name: name}).catch((any) => {
                        console.log(any)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>