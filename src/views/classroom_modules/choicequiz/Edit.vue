<template>
    <div>
        <ContentHeader class="my-2">Edit : Choice Quiz</ContentHeader>
        <div>
            <!-- Name -->
            <div>
                <v-text-field
                        label="name"
                        outlined
                        dense
                        v-model="form.name"
                        :rules="[rules.required]"
                >
                </v-text-field>
            </div>

            <div>
                <div>
                    <div v-for="(q,q_index) in form.question_set" :key="q_index">
                        <v-card class="ma-4">
                            <v-card-title class="d-flex">
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                                class="flex-grow-1"
                                                v-model="q.text"
                                                outlined
                                                hide-details
                                                :rules="[rules.required]"
                                                dense
                                                :label="'Question '+(q_index+1)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-text-field
                                                class="flex-shrink-1"
                                                v-model="q.score"
                                                outlined
                                                hide-details
                                                :rules="[rules.required]"
                                                dense
                                                label="score"
                                                type="number"
                                        >
                                        </v-text-field>
                                    </v-col>

                                </v-row>

                                <v-btn
                                        color="red"
                                        icon
                                        outlined
                                        class="ml-2"
                                        @click="delete_question(q_index)"
                                >
                                    <v-icon>
                                        mdi-close
                                    </v-icon>
                                </v-btn>


                            </v-card-title>
                            <v-card-text>
                                <div v-for="(c,c_index) in q.choice_set" :key="c_index"
                                     class="d-flex align-center justify-center">

                                    <v-row align="center" class="my-2 mx-2">
                                        <v-checkbox
                                                color="primary"
                                                v-model="c.is_true"
                                                hide-details
                                                class="shrink  mt-0"
                                        />

                                        <v-text-field
                                                :label="'Choice '+(c_index+1)"
                                                v-model="c.text"
                                                append-outer-icon="mdi-close"
                                                outlined
                                                dense
                                                :rules="[rules.required]"
                                                hide-details
                                                @click:append-outer="delete_choice(q_index,c_index)"
                                        />
                                    </v-row>
                                </div>

                                <div class="mx-2">
                                    <v-btn color='grey lighten-1'
                                           class="white--text"
                                           block
                                           @click="add_choice(q_index)"
                                           v-if="q.choice_set.length <4"
                                    >
                                        Add Choice
                                    </v-btn>
                                </div>

                            </v-card-text>
                        </v-card>

                    </div>
                    <div class="ma-4">
                        <v-btn color='grey lighten-1' large class="white--text" block @click="add_question">Add
                            Question
                        </v-btn>
                    </div>
                </div>

            </div>
            <div class="text-end">
                <v-btn large @click="save" color="primary" class="black--text">SAVE</v-btn>
            </div>

        </div>
    </div>
</template>

<script>
import ContentHeader from "../../../components/share/ContentHeader";
import ButtonPrimary from "../../../components/share/ButtonPrimary";

export default {
        name: "ChoiceQuizCreate",
        components: {ButtonPrimary, ContentHeader},
        data: () => ({
            rules: {
                required: value => !!value || 'Required.',
            },
            form: {
                name: null,
                classroom_module: null,
                question_set: [
                    {
                        text: null,
                        image: null,
                        score: 0,
                        choice_set:
                            [
                                {
                                    text: null,
                                    is_true: true
                                },
                                {
                                    text: null,
                                    is_true: false
                                },
                            ]
                    },
                ]
            }
        }),
      mounted() {
        this.loadData()
      },
      methods: {
          async loadData(){
            let id = this.$route.params.choice_quiz_id
            this.form = await this.$store.dispatch('classroom_modules/choicequiz/getChoiceQuiz', id)
          },
            delete_question(index) {
                if (this.form.question_set.length > 1) {
                    this.form.question_set.splice(index, 1)
                }
            },
            add_question() {
                this.form.question_set.push(
                    {
                        text: null,
                        image: null,
                        score: 0,
                        choice_set:
                            [
                                {
                                    text: null,
                                    is_true: true

                                },
                                {
                                    text: null,
                                    is_true: false
                                },
                            ]
                    }
                )
            },
            add_choice(q_index) {
                if (this.form.question_set[q_index].choice_set.length < 4) {
                    this.form.question_set[q_index].choice_set.push({
                        text: null,
                        is_true: false
                    },)
                }
            },
            delete_choice(q_index, c_index) {
                if (this.form.question_set[q_index].choice_set.length > 2) {
                    this.form.question_set[q_index].choice_set.splice(c_index, 1)
                }
            },
            async save() {
                let data = await this.$store.dispatch("classroom_modules/choicequiz/updateChoiceQuiz", this.form)
                if (data) {
                    await this.$router.push({'name': 'ChoiceQuizIndex'})
                }
            }
        }
    }
</script>

<style scoped>

</style>