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
                                placeholder="search by classroom name"
                                filled
                                rounded
                                dense
                                hide-details
                                @keydown.13="search"
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
                            <v-select label="filter"
                                      v-model="form_params.role"
                                      outlined
                                      filled
                                      hide-details
                                      dense
                                      rounded
                                      :items="role_filter_list"
                                      return-object
                                      @change="filter"
                            >
                            </v-select>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>

        <div v-if="classrooms && classrooms.length">
            <v-row justify-sm="center" justify-md="start">
                <v-col cols="12" md="4" v-for="(classroom,index) in classrooms" :key="index">
                    <ClassroomCard
                            class="ma-5"
                            :classroom="classroom"
                    ></ClassroomCard>
                </v-col>
            </v-row>
        </div>
        <div v-else class="d-flex flex-column justify-center align-center">
            <FreeLicenseImage
                    asset_src="no_data.png"
                    width="350"
                    height="260"
                    a_text="Designed by stories / Freepik"
                    href="http://www.freepik.com"
            >
            </FreeLicenseImage>
        </div>

    </div>
</template>

<script>
    import ContentHeader from "../../components/share/ContentHeader";
    import ClassroomCard from "../../components/classroom/ClassroomCard";
    import FreeLicenseImage from "../../components/share/FreeLicenseImage";

    export default {
        name: "ClassroomIndex",
        components: {FreeLicenseImage, ClassroomCard, ContentHeader},
        data() {
            return {
                role_filter_list: [
                    {
                        id: null,
                        text: 'select ..'
                    },
                    {
                        id: 1,
                        text: 'owner'
                    },
                    {
                        id: 2,
                        text: 'teacher'
                    }, {
                        id: 3,
                        text: 'student'
                    },
                ],
                form_params: {
                    search: null,
                    role: null
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

            },
            search() {
                this.loadData()
            },
            filter(e) {
                this.form_params.role = e.id
                this.loadData()
            }

        }
    }
</script>

<style scoped>

</style>