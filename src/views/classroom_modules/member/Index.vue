<template>
    <div>
        <div>
            <v-container fluid class="pa-0">
                <v-row>
                    <v-col cols="12" class="ma-0">
                        <v-toolbar flat>

                            <v-col cols="12" sm="4">

                                <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Search for member"
                                        outline
                                        filled
                                        rounded
                                        dense
                                        hide-details
                                ></v-text-field>
                            </v-col>


                            <v-spacer></v-spacer>


                            <div class="mb-6">
                                <v-col cols="12" sm="3">
                                    <v-btn
                                            medium
                                            small color="primary"
                                            class="black--text"
                                            filled
                                            rounded
                                            dense


                                    >
                                        <v-icon>mdi-plus-circle</v-icon>

                                        Add Member

                                    </v-btn>
                                </v-col>

                            </div>


                        </v-toolbar>


                    </v-col>
                </v-row>
            </v-container>
            <div>

            <v-card>
                <v-card-title>
                    Owner
                </v-card-title>

                <v-data-table
                        :headers="headers_owner"
                        :items="owner"
                        :search="search"

                >
                    <template v-slot:item.setting="{ item }">


                    </template>

                    <template v-slot:item.manage="{ item }">
                        <v-btn
                                icon
                                color="black"
                                @click="setting(item)"
                        >
                            <v-icon>
                                mdi-cog
                            </v-icon>

                        </v-btn>
                        <v-btn
                                icon
                                color="black"
                                @click="delete_owner(item)"

                        >
                            <v-icon>
                                mdi-trash-can-outline
                            </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>


            </v-card>

                <br>

                <div>

            <v-card>
                <v-card-title>
                    Student
                </v-card-title>


                <v-data-table
                        :headers="headers_student"
                        :items="student"
                        :search="search"


                >


                    <template v-slot:item.view="{ item }">


                    </template>


                    <template v-slot:item.manage="{ item }" >

                        <v-btn
                                icon
                                color="black"

                                @click="view(item)"

                        >
                            <v-icon>
                                mdi-cog
                            </v-icon>

                        </v-btn>
                    <v-btn
                            icon
                            color="black"

                            @click="delete_student(item)"

                    >
                        <v-icon >
                            mdi-trash-can-outline
                        </v-icon>
                    </v-btn>


                    </template>




                </v-data-table>


            </v-card>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    export default {
        name: "MemberIndex",
        data() {
            return {
                search: '',
                headers_owner: [
                    {
                        text: 'Teacher ',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text : "Manage",
                        align : 'center',
                        value : "manage"
                    },
                    {

                        // align : 'start',
                        value : "setting"
                    },


                ],
                headers_student: [
                    {
                        text: 'Member',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text : "Manage",
                        align : 'center',
                        value : "manage"
                    },
                    {

                        // align : 'start',
                        value : "view"
                    },


                ],
                owner: [
                    {
                        name: 'T.Deer',


                    },
                    {
                        name: 'T.Smart',

                    },
                    {
                        name: 'T.Gen',

                    },

                ],
                student: [
                    {
                        name: 'Adam ',

                    },
                    {
                        name: 'Ava',

                    },
                    {
                        name: 'Olivia',

                    },

                ],

            }

        },
        methods :{
            delete_student (item) {
                alert(`delete ${item.name}`)
            },
            delete_owner (item) {
                alert(`delete ${item.name}`)
            },

            view (item) {
                alert(`item is ${item.name}`)
            },
            setting (item) {
                alert(`item is ${item.name}`)
            },



        }
    }
</script>

<style scoped>

</style>
