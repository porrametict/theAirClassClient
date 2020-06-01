<template>
    <div class="d-flex">
        <div>
            <div v-if="show_detail" class="d-flex ">
                <v-img :src="img_url" width="100" max-width="100" class="ma-2" height="100" max-height="100"/>
                <div class="ma-2">
                    <div class="d-flex">
                        <p class="display-1 font-weight-bold ma-0">Usage of Thai Language</p>
                        <v-btn
                                class="mx-2"
                                icon
                                outlined
                                @click="$router.push({name : 'EditClassroom'})"
                        >
                            <v-icon>mdi-pencil</v-icon>

                        </v-btn>
                    </div>


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
            <div v-else>
                <div class="d-flex ">
                    <v-img
                            :src="img_url"
                            max-width="50"
                            class="mx-2"
                    >
                    </v-img>
                    <div class="d-flex justify-space-between" style="width: 100%">
                        <p class="display-1 font-weight-bold">
                            Usage of Thai Language
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-2 ml-auto">
            <v-btn icon @click="show_detail = !show_detail" outlined>
                <v-icon >
                    mdi-chevron-{{show_detail ? 'up' : 'down'}}
                </v-icon>
            </v-btn>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ClassroomDetail",
        props : {
            is_show_detail  : {
                type : [String,Boolean],
                require : false,
                default : true
            }
        },
        mounted() {
            this.show_detail  = this.is_show_detail

        },
        data() {
            return {
                img_url: "https://png.pngtree.com/png-clipart/20190903/original/pngtree-a-stack-of-books-and-plants-together-png-image_4429927.jpg",
                show_detail : false
            }
        }
    }
</script>

<style scoped>

</style>