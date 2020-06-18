<template>
    <div>
        <p class="mt-2">
            <ContentHeader icon="mdi-account">Header</ContentHeader>
        </p>
        <div align="center" class="mt-5">
            <p>
                <ButtonSubmit @click="btn_click">Save</ButtonSubmit>
            </p>
            <p>
                <ButtonCancel @click="btn_click">Cancel</ButtonCancel>
            </p>
            <p>
                <ButtonPrimary @click="btn_click">Click</ButtonPrimary>
            </p>
            <p>
                <ButtonIcon
                        @click="btn_click"
                        tooltip_text="text will show when hover"
                >
                    <v-icon>
                        mdi-account
                    </v-icon>
                </ButtonIcon>
            </p>
            <p>
                <CircleImageCropper @getOutput="image_getOutput"></CircleImageCropper>
                <CircleImageCropper @getOutput="image_getOutput">
                    <template v-slot:activator="{ on }">
                        <v-btn icon color="blue" v-on="on">
                            <v-icon>
                                mdi-image
                            </v-icon>

                        </v-btn>
                    </template>
                </CircleImageCropper>
            </p>
            <p>
                <ConfirmDialog @change="confirmChange"></ConfirmDialog>
                <ConfirmDialog @change="$event ? confirmChange('Hello') : confirmChange('World')">
                    <template v-slot:activator="{ on }">
                        <v-btn icon color="red" v-on="on">
                            <v-icon>
                                mdi-delete
                            </v-icon>

                        </v-btn>
                    </template>
                </ConfirmDialog>
            </p>

            <p>
                <FreeLicenseImage
                        width="150"
                        asset_src="classroom.png"
                        a_text="Designed by stories / Freepik"
                        href="http://www.freepik.com"
                >
                </FreeLicenseImage>
            </p>
            <p>
                <DialogPrimary
                        :hide_action_btn="true"
                        :use_open_button="true"
                >
                    <div>
                        cat can fly
                    </div>
                </DialogPrimary>
                <br/>
                <DialogPrimary
                        :use_open_button="true"
                >
                    <div>
                        cat can fly
                    </div>
                </DialogPrimary>

                <DialogPrimary
                        :use_open_button="true"
                        :double_action_btn="true"
                >
                    <template v-slot:open_btn="{on}">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:head="{on}">
                        <v-card-title class="blue">
                            <span>
                                New header
                            </span>

                            <v-spacer></v-spacer>
                            <v-btn v-on="on">
                                close
                            </v-btn>
                        </v-card-title>
                    </template>
                    <div class="ma-8">
                        cat can fly
                    </div>
                </DialogPrimary>

                <v-btn @click="UseEventBusToOpen" color="red">
                    Use EVent Bus
                </v-btn>
                <DialogPrimary>
                    <template v-slot:head="{on}">
                        <v-card-title class="red">
                            <span class="display-1 white--text">
                                อย่ากดเปิดครั้งที่ 2 มันจะค้าง เนื่อกจากมีการเรียกใช้ Compoment เดียวกัน ในหน้าเดียวกัน
                            </span>
                            <v-spacer></v-spacer>
                            <v-btn v-on="on">
                                close
                            </v-btn>
                        </v-card-title>
                    </template>
                    <div class="title">
                        คำเตือน ในหน้าที่มีการใช้ Event Bus หน้านั้นๆ ควร จะมีการเรียกเเท็กของ Component เพียงครั้งเดียว ไม่งั้นมันจะเรียกใช้กับ component ทั้งหมดอย่างนี้
                    </div>
                </DialogPrimary>
            </p>
        </div>
    </div>
</template>

<script>
    import ButtonCancel from "../components/share/ButtonCancel";
    import ButtonPrimary from "../components/share/ButtonPrimary";
    import ButtonIcon from "../components/share/ButtonIcon";
    import ButtonSubmit from "../components/share/ButtonSubmit";
    import CircleImageCropper from "../components/share/CircleImageCropper";
    import ConfirmDialog from "../components/share/ConfirmDialog";
    import ContentHeader from "../components/share/ContentHeader";
    import FreeLicenseImage from "../components/share/FreeLicenseImage";
    import DialogPrimary from "../components/share/DialogPrimary";
    import {EventBus} from "../event-bus";

    export default {
        name: "ShareComponentUsage",
        components: {
            DialogPrimary,
            FreeLicenseImage,
            ContentHeader,
            ConfirmDialog,
            CircleImageCropper,
            ButtonSubmit,
            ButtonIcon,
            ButtonPrimary,
            ButtonCancel},
        methods: {
            btn_click() {
                alert("Hello")
            },
            image_getOutput(e) {
                console.log(e)
            },
            confirmChange(e) {
                alert(e)
            },
            UseEventBusToOpen(){
                EventBus.$emit('open-dialog-primary')
            },
        },

    }
</script>

<style scoped>

</style>