<template>
  <v-content>
    <v-container fluid class="fill-height ma-0 pa-0">
      <div class="flex-grow-1 fill-height primary  justify-center align-center d-none d-md-flex">
        <div>
          <v-img :src="require(`@/assets/logo_theairclass.png`)"
                 width="100%"
                 height="100%"
          />
        </div>
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
              @keypress.13="getUserToken"
              :error="error.password"
              :error-messages="error.password"
          >
          </v-text-field>
          <div class=" d-flex align-center flex-column flex-md-row justify-space-between mb-8">
            <v-checkbox label="Remember me" v-model="form.remember_me"></v-checkbox>
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
            <router-link to="/register">ลงทะเบียน</router-link>
            <span> ที่นี่</span>
          </p>
        </div>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import Base from '@/components/share/base/Base'

export default {
  extends: Base,
  name: 'Login',
  components: {},
  data: () => ({
    show_password: false,
    rules: {
      required: value => !!value || 'Required.',
    },
    form: {
      username: "",
      password: "",
      remember_me: false
    },
  }),
  created() {
    this.get_logInItem()
  },
  methods: {
    remember__me() {
      let item = JSON.stringify(this.form)
      localStorage.setItem('login_item', item)
    },
    get_logInItem() {
      if (localStorage.getItem('login_item')) {
        let item = localStorage.getItem('login_item')
        localStorage.removeItem('login_item')
        this.form = JSON.parse(item)
      }

    },
    async getUserToken() {
      let token = await this.$store.dispatch('user/getUserToken', this.form)
      if (token) {
        if (this.form.remember_me) {
          this.remember__me()
        }
        await this.$router.push({
          name: 'Home'
        })
      }
    }
  }
}
</script>
