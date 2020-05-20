<template>
    <div>
     <v-card
             class="mx-auto"
             max-width="400"
     >
         <v-container class="fill-height">
             <v-row
                     align="center"
                     justify="center"
             >
             </v-row>
         </v-container>
         <v-img
                 class="white--text align-end"
                 height="200px"
                 src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
         >
             <v-card-title>Subject</v-card-title>
         </v-img>

         <v-card-subtitle class="pb-0">

         </v-card-subtitle>

         <v-card-text class="text--primary">
             <div>คำอธิบายรายวิชา</div>

             <div>คำอธิบายรายวิชา</div>
         </v-card-text>

         <!--<v-card-actions>-->
             <!---->
         <!--</v-card-actions>-->



     </v-card>
        <v-row>
        <v-col class="text-center" cols="12" sm="12" >
            <div class="my-2">
        <v-btn
                color="#FFD600"
                type="button"
                @click="ClassroomSetting"
        >
            view
        </v-btn>
                <!--<v-btn-->
                        <!--class="ma-2"-->
                        <!--tile outlined color="#C4C4C4"-->
                        <!--@click="gotoEditClassroom"-->


                <!--&gt;-->
                    <!--<v-icon left>mdi-pencil</v-icon> Edit-->
                <!--</v-btn>-->
            </div>

        </v-col>

        </v-row>
    </div>

</template>

<script>
    export default {
        name: "Classroom_index",
        data: () => ({
            show: false,

        }),
        methods : {
            async ClassroomSetting(){
                this.$router.push('setting-member')
            },

        }
    }
</script>

<style scoped>

</style>
