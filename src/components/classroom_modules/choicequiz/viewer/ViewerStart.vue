<template>
  <div>
    <p class="title text-center"> Please wait</p>
    <FreeLicenseImage
        asset_src="loading.png"
        height="260"
        a_text="Designed by stories / Freepik"
        href="http://www.freepik.com"
    >
    </FreeLicenseImage>
  </div>
</template>

<script>
import FreeLicenseImage from "@/components/share/FreeLicenseImage";
export default {
name: "ViewerStart",
  components: {FreeLicenseImage}
}
</script>

<style scoped>

</style>