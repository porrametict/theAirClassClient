<template>
    <div>
        <v-data-table
                :headers="headers"
                :items=" assignments "

        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Assignment</v-toolbar-title>
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
                                   v-on="on">Add Assignment</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" class="d-flex ma-auto">
                                            <v-file-input label="File input" outlined dense></v-file-input>
                                        </v-col>

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

        </v-data-table>
    </div>
</template>

<script>
    export default {
        name: "AssignmentsIndex",
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'Assignments ',
                    align: 'start',
                    sortable: false,
                    value: 'file',
                },

            ],

        }),
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New AssignmentsIndex' : ' '
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
                this.assignments = [
                    {

                    },

                ]
            },

            editItem (item) {
                this.editedIndex = this.assignments.indexOf( item )
                this.editedItem = Object.assign({}, item )
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.assignments.indexOf(item)
                confirm('Are you sure you want to delete this assignments?') && this.assignments.splice(index, 1)
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
                    Object.assign(this.assignments[this.editedIndex], this.editedItem)
                } else {
                    this.assignments.push(this.editedItem)
                }
                this.close()
            },
        },


    }
</script>

<style scoped>

</style>
