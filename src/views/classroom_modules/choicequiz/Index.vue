<template>
    <div>
        <ButtonPrimary @click="$router.push({name :'ChoiceQuizCreate'})">Add</ButtonPrimary>
        ChoiceQuizIndex
    </div>
</template>

<script>
    import ButtonPrimary from "../../../components/share/ButtonPrimary";
    export default {
        name: "ChoiceQuizIndex",
        components: {ButtonPrimary}
    }
</script>

<style scoped>

</style>