<template>
    <div>
        <br>
        <h1>Subject</h1>
        <br>

        <div>


            <v-tabs
                    fixed-tabs
                    background-color="#FFFFFF"



            >

                <v-tab class="black--text"
                >
                    Member
                </v-tab>

                <v-tab
                >
                    Question
                </v-tab>

                <v-tab
                >
                    Watching History
                </v-tab>

                <v-tab
                >
                    Assignments
                </v-tab>

                <v-tab
                >
                    Score
                </v-tab>

            </v-tabs>
        </div>
        <div>
            <hr>
            <br>


            <v-container fluid class="pa-0">
                <v-row>
            <v-col cols="12"  class="ma-0">
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

                <!--<v-btn-->

                        <!--class="mb-7"-->
                <!--&gt;-->
                    <!--<v-icon   large>mdi-magnify</v-icon>-->
                <!--</v-btn>-->

                <v-spacer></v-spacer>


                <div class="mb-6"  >
                    <v-col cols="12" sm="3">
                    <v-btn
                            medium
                            small color="#FFD600"


                    >
                        <v-icon >mdi-plus-circle</v-icon>

                        Add Member

                    </v-btn>
                    </v-col>

                </div>


            </v-toolbar>



            </v-col>
                </v-row>
            </v-container>

            <v-card>
                <v-card-title>
                    Owner
                </v-card-title>

                <v-data-table
                        :headers="headers_owner"
                        :items="owner"
                        :search="search"
                ></v-data-table>



            </v-card>

            <v-card>
                <v-card-title>
                    Student
                </v-card-title>

                <v-data-table
                        :headers="headers_student"
                        :items="student"
                        :search="search"
                >
                    <v-btn
                            icon
                            color="grey"
                            class="white--text"

                    >
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>

                </v-data-table>



            </v-card>

        </div>







    </div>
</template>

<script>
    export default {

        name: "Setting_member",
        data () {
            return {
                search: '',
                headers_owner: [
                    {
                        text: 'Teacher ',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                //     { text: 'Calories', value: 'calories' },
                //     { text: 'Fat (g)', value: 'fat' },
                //     { text: 'Carbs (g)', value: 'carbs' },
                //     { text: 'Protein (g)', value: 'protein' },
                //     { text: 'Iron (%)', value: 'iron' },
                ],
                headers_student: [
                    {
                        text: 'Member',
                        align: 'start',
                        sortable: false,
                        value: 'name',
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
            methods: {
                this.$router.push('')
            }
        },
    }
</script>

<style scoped>

</style>
