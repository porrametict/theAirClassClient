<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="question"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Questions</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn small color="primary"
                                   class="black--text"
                                   filled
                                   rounded
                                   dense
                                   v-on="on">Create</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" class="d-flex ma-auto">
                                            <v-text-field v-model="editedItem.name" label="Question"></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="d-flex ma-auto" >
                                            <!--<v-checkbox v-model="Choice"-->
                                                        <!--hide-details-->
                                                        <!--class="shrink mr-2 mt-0"-->
                                            <!--&gt;</v-checkbox>-->
                                            <v-text-field v-model="editedItem.choice1" label="Choice " value="choice-1"></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="d-flex ma-auto">
                                            <!--<v-checkbox-->
                                                        <!--hide-details-->
                                                        <!--class="shrink mr-2 mt-0"-->
                                            <!--&gt;</v-checkbox>-->
                                            <v-text-field v-model="editedItem.choice2" label="Choice " value="choice-2"></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="d-flex ma-auto">
                                            <!--<v-checkbox-->
                                                        <!--hide-details-->
                                                        <!--class="shrink mr-2 mt-0"-->
                                            <!--&gt;</v-checkbox>-->
                                            <v-text-field v-model="editedItem.choice3" label="Choice " value="choice-3" ></v-text-field>
                                        </v-col>

                                        <!--<v-col cols="12" class="d-flex ma-auto">-->
                                            <!--<v-checkbox-->
                                                        <!--v-model="enabled"-->
                                                        <!--hide-details-->
                                                        <!--class="shrink mr-2 mt-0"-->
                                            <!--&gt;</v-checkbox>-->
                                            <!--<v-text-field v-model="editedItem.choice4" label="Choice " :disabled="!enabled" ></v-text-field>-->
                                        <!--</v-col>-->
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
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

        </v-data-table>
    </div>
</template>

<script>
    export default {
        name: "QuestionIndex",
        data: () => ({
            dialog: false,
            radios: false,
            enabled: false,
            Choice: false,
            headers: [
                {
                    text: 'Question ',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },

                { text: 'Manage', value: 'manage', sortable: false },
            ],
            question: [
                {
                    name: '1. What is Thai languages ?',
                    choice1: ' Hello ',
                    choice2: ' Hello ',
                    choice3: ' Hello ',
                }

            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                choice1: '',
                choice2: '',
                choice3: '',
                choice4: '',
            },
            defaultItem: {
                name: '',
                choice1: '',
                choice2: '',
                choice3: '',
                choice4: '',
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Question' : 'Edit Question'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.question = [
                    {
                        name: '1. What is Thai languages ?',
                        choice1: ' Hello ',
                        choice2: ' Hello ',
                        choice3: ' Hello '
                    },

                ]
            },

            editItem (item) {
                this.editedIndex = this.question.indexOf( item )
                this.editedItem = Object.assign({}, item )
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.question.indexOf(item)
                confirm('Are you sure you want to delete this question?') && this.question.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.question[this.editedIndex], this.editedItem)
                } else {
                    this.question.push(this.editedItem)
                }
                this.close()
            },
        },





    }

</script>

<style scoped>

</style>
