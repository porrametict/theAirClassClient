<template>
  <div>
    <router-view class="ma-2"></router-view>
  </div>
</template>

<script>
    import ContentHeader from "@/components/share/ContentHeader";
    export default {
        name: "ChoiceQuizTemplate",
      components: {ContentHeader}
    }
</script>

<style scoped>

</style>