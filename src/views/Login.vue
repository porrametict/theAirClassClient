<template>
    <v-container fluid class="fill-height ma-0 pa-0">
        <div class="flex-grow-1 fill-height primary  justify-center align-center d-none d-md-flex">
            <p class="display-2">IMAGE</p>
        </div>
        <div class="d-flex flex-column flex-grow-1 pa-5">
            <h1 class="display-3 text-center my-5">Login</h1>
            <div>
                <v-text-field
                        label="Username"
                        prepend-icon="mdi-account"
                        v-model="form.username"
                        :rules="[rules.required]"
                >
                </v-text-field>
                <v-text-field
                        label="Password"
                        v-model="form.password"
                        prepend-icon="mdi-lock"
                        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_password ? 'text' : 'password'"
                        @click:append="show_password = !show_password"
                        :rules="[rules.required]"
                >
                </v-text-field>
                <div class=" d-flex align-center flex-column flex-md-row justify-space-between mb-8">
                    <v-checkbox label="Remember me"></v-checkbox>
                    <a>Forgot Password</a>
                </div>
                <div class="text-center ">
                    <v-btn
                            color="primary"
                            class="black--text"
                            large
                            @click="getUserToken"
                    >
                        login
                    </v-btn>
                </div>
            </div>

            <div class="mt-5 text-center text-md-end">
                <p>
                    <span>สมัครสมาชิกใหม่ ? </span>
                    <router-link to="/register" >ลงทะเบียน</router-link>
                    <span> ที่นี่</span>
                </p>
            </div>

        </div>

    </v-container>
</template>

<script>
    export default {
        name: 'Login',
        components: {},
        data: () => ({
            show_password: false,
            rules: {
                required: value => !!value || 'Required.',
            },
            form: {
                username: "admin",
                password: "password",
            },
        }),
        methods: {
            async getUserToken() {
                let token = await this.$store.dispatch('user/getUserToken', this.form)
                if (token) {
                    await this.$router.push({
                        name: 'Home'
                    })
                } else {
                    alert("login failed")
                }
            }
        }
    }
</script>
