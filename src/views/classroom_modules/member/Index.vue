<template>
    <div>
        <!--header-->
        <div class="mt-2">
            <v-row align="center" justify="end">
                <v-col cols="12" md="4">
                    <v-text-field
                            filled
                            rounded
                            hide-details
                            dense
                            append-icon="mdi-magnify"
                            placeholder="search"
                    ></v-text-field>
                </v-col>
            </v-row>
        </div>
        <div>
            <!-- Member-->
            <div v-if="members">
                <v-card>
                    <v-card-title>
                        Member
                    </v-card-title>

                    <v-data-table
                            :headers="headers_member"
                            :items="members"
                    >
                        <template v-slot:item.user="{item}">
                            {{item.user.first_name}} {{item.user.last_name}}
                        </template>

                        <template v-slot:item.manage="{ item }">
                            <ConfirmDialog
                                    message="remove this user form classroom ?"
                                    @change="delete_member($event,item)"
                            >
                                <template v-slot:activator="{on}">
                                    <v-btn
                                            icon
                                            outlined
                                            color="red"
                                            v-on="on"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>

                            </ConfirmDialog>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
    import ContentHeader from "../../../components/share/ContentHeader";
    import ButtonIcon from "../../../components/share/ButtonIcon";
    import ConfirmDialog from "../../../components/share/ConfirmDialog";

    export default {
        name: "MemberIndex",
        components: {ConfirmDialog, ButtonIcon, ContentHeader},
        data() {
            return {
                members: null,
                form_params: {
                    search: null,
                },
                headers_member: [
                    {
                        text: 'Name ',
                        align: 'start',
                        sortable: false,
                        value: 'user',
                    },
                    {
                        text: "Manage",
                        align: 'center',
                        value: "manage"
                    },

                ],
            }

        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData() {
                let data = await this.$store.dispatch('classroom_modules/member/getListMember', this.form_params)
                this.members = data.results
            },
            async delete_member(e, item) {
                if (e) {
                    let data = await this.$store.dispatch('classroom_modules/member/deleteMember', item.id)
                    if (data != null) {
                        await this.loadData()
                    }
                }

            },
        }
    }
</script>

<style scoped>

</style>
