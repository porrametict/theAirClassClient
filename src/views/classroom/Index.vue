<template>
    <div>
        <ContentHeader icon="mdi-school" text="Classroom">
        </ContentHeader>

        <div>
            <div class="ma-0 pa-0">
                <v-row>
                    <v-col cols="12" md="6">
                    </v-col>
                    <!--        Search-->
                    <v-col cols="12" md="4">
                        <v-text-field
                                v-model="form_params.search"
                                placeholder="search your classroom ...."
                                filled
                                rounded
                                dense
                                hide-details
                        >
                            <template v-slot:append>
                                <v-fade-transition leave-absolute>
                                    <v-icon color="grey">mdi-magnify</v-icon>
                                </v-fade-transition>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <!--        Filter-->
                        <div>
                            <v-select label="ตัวกรอง"
                                      outlined
                                      filled
                                      hide-details
                                      dense
                                      rounded
                                      :items="['เลือก..','เป็นเจ้าของ','เป็นอาจารย์','เป็นนักเรียน']">
                            </v-select>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>

        <div class="d-flex justify-center flex-wrap" v-if="classrooms">
            <ClassroomCard
                    class="ma-5"
                    v-for="(classroom,index) in classrooms" :key="index"
                    :classroom="classroom"
            ></ClassroomCard>
        </div>
    </div>
</template>

<script>
    import ContentHeader from "../../components/share/ContentHeader";
    import ClassroomCard from "../../components/classroom/ClassroomCard";

    export default {
        name: "ClassroomIndex",
        components: {ClassroomCard, ContentHeader},
        data() {
            return {
                form_params: {
                    search: null
                },
                classrooms: null
            }
        },
        async mounted() {
            await this.loadData()
        },
        methods: {
            async loadData() {
                let classrooms = await this.$store.dispatch("classroom/getListClassroom", this.form_params)
                this.classrooms = classrooms.results

            }
        }
    }
</script>

<style scoped>

</style>