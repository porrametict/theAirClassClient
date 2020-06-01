<template>
    <div>
        <!--        classroom detail -->
        <div class="d-flex">
            <v-img :src="img_url" width="100" max-width="100" class="ma-2" height="100" max-height="100"/>
            <div class="ma-2">
                <p class="display-1 font-weight-bold ma-0">Usage of Thai Language</p>
                <div>
                    <span class="mx-2"><span class="font-weight-bold">Course code :</span> E3310</span>
                    <span class="mx-2"><span class="font-weight-bold">Section :</span> 1</span>
                    <br>
                    <span class="mx-2"><span class="font-weight-bold">Credit :</span> 3(2-1-0)</span>
                    <span class="mx-2"><span class="font-weight-bold">Amount :</span> 30</span>
                    <br>
                    <span class="mx-2"><span class="font-weight-bold">Classroom code :</span> 1345798</span>
                    <br>
                    <span class="mx-2">
                        <span class="font-weight-bold">Detail :</span>
                          การสื่อสารด้วยคำ วลี
                            การแต่งประโยค สำนวน และโวหารในภาษาไทย
                            การจับใจความสำคัญจากการฟังและการอ่าน การเขียนย่อหน้า
                            การสรุปความ และการแสดงความคิดผ่านทักษะการใช้ภาษาไทยที่เหมาะสม
                    </span>
                </div>
            </div>
        </div>
        <v-divider class="mt-2"></v-divider>
        <!--        content-->
        <div>
            <!--            head-->
            <div>
                <v-tabs
                        fixed-tabs
                >
                    <v-tab
                            exact
                            @click="router_push('MemberIndex')"
                    >
                        Member
                    </v-tab>
                    <v-tab
                            exact
                            @click="router_push('QuestionIndex')"

                    >
                        Question
                    </v-tab>
                    <v-tab
                            exact

                    >
                        Watching History
                    </v-tab>

                    <v-tab
                            exact
                            @click="router_push('AssignmentsIndex')"


                    >
                    Assignments
                    </v-tab>
                    <v-tab
                            exact
                            @click="router_push('ScoreIndex')"

                    >
                        Score
                    </v-tab>

                </v-tabs>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClassroomMain",
        data() {
            return {
                img_url: "https://png.pngtree.com/png-clipart/20190903/original/pngtree-a-stack-of-books-and-plants-together-png-image_4429927.jpg"
            }
        }, methods: {
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
