<template>
    <div>
        <v-container class=" justify-center d-outline-flex  pa-10 ">
        <v-card
                class="pa-10 "
        >

            <v-col cols="12" md="4" class="mx-auto"  >
        <h1 >Join Classroom</h1>
        <br>

        <v-form >

                <v-text-field

                        placeholder="enter classroom code"
                        filled
                        rounded
                        dense
                ></v-text-field>

            <v-spacer></v-spacer>


        <div class="mb-6">

            <v-col  cols="12" sm="3" >

                <v-btn
                        color="#FFD600"
                        type="button"
                        @click=" "
                        filled
                        rounded
                        dense

                >Join New Classroom


                </v-btn>

        </v-col>
        </div>


    </v-form>
            </v-col>
        </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Classroom_join",
        data: () => ({
            
        })
    }
</script>

<style scoped>

</style>
