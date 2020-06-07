<template>
    <div class="d-flex flex-column align-center justify-center">
        <v-img class="ma-0 pa-0"
               :height="height"
               :width="width"
               :src="require(`@/assets/${asset_src}`)"
               :alt="alt"
        />
        <a class="overline  grey--text ma-0 pa-0 text--disabled"
           style="text-decoration: none"
           :href="href"
        >
            {{a_text}}
        </a>
    </div>
</template>

<script>
    export default {
        name: "FreeLicenseImage",
        props: {
            height: {
                type: String,
                require: false,
                default: "auto"
            },
            width: {
                type: String,
                require: false,
                default: "auto"
            },
            asset_src: {
                type: String,
                require: true
            },
            alt: {
                type: String,
                require: false,
                default: "Image"
            },
            href: {
                type: String,
                require: false,
                default: "http://www.freepik.com"
            },
            a_text: {
                type: String,
                require: true
            }
        },
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

</style>