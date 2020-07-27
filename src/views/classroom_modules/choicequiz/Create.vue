<template>
    <div>
        Choice Quiz Create
    </div>
</template>

<script>
    export default {
        name: "ChoiceQuizCreate",
        data: () => ({
            form: {
                name: null,
                classroom_module: null,
                questions: [
                    {
                        text: null,
                        image : null,
                        score : null,
                        choices:
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
        methods: {
            delete_question(index) {
                if (this.form.questions.length <= 1) {
                    this.form.questions.splice(index, 1)
                }
            },
            add_question() {
                this.form.questions.push(
                    {
                        text: null,
                        image : null,
                        score : null,
                        choices:
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
                if (this.form.questions[q_index].choices.length < 4) {
                    this.form.questions[q_index].choices.push({
                        text: null,
                        is_true: true
                    },)
                }
            },
            delete_choice(q_index, c_index) {
                if (this.form.questions[q_index].choices.length > 2) {
                    this.form.questions[q_index].choices.splice(c_index, 1)
                }
            },
            async saveQQ() {
                this.form.subject_id = this.$route.params.id
                console.log(this.form.subject_id)
                let data = await this.$store.dispatch("choice_quiz/createChoiceQuiz", this.form)
                if (data) {
                    await this.$router.push({'name': 'ChoiceQuiz'})
                }
            }
        }
    }
</script>

<style scoped>

</style>