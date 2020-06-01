<template>
    <div>
        <v-data-table
                :headers="headers"
                :items=" score "

        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Score</v-toolbar-title>

                    <template v-slot:item.manage="{ item }">
                        <v-btn icon >
                            <v-icon


                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        <v-icon
                                small
                                @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>

                </v-toolbar>
            </template>

        </v-data-table>
    </div>
</template>

<script>
    export default {
        name: "ScoreIndex",
        data: () => ({
            headers: [

            ],
            score: [
                {
                    name: 'Adam Sander'
                }
            ],

        }),


    }
</script>

<style scoped>

</style>
