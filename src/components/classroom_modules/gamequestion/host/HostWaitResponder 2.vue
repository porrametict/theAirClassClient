<template>
  <div>
    <h1>Please wait..</h1>
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
  name: "HostWaitResponder",
  components: {FreeLicenseImage}
}
</script>

<style scoped>

</style>