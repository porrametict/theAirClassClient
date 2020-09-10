<template>
  <v-content>
    <v-container fluid class="fill-height ma-0 pa-0">
      <div class="flex-grow-1 fill-height primary  justify-center align-center d-none d-md-flex">
        <p class="display-2">The Air Class</p>
      </div>
      <div class="d-flex flex-column flex-grow-1 pa-5">
        <h1 class="display-3 text-center my-5">Register</h1>
        <div>
          <v-text-field
              label="Username"
              v-model="form.username"
              :rules="[rules.required]"
              :error="error.username"
              :error-messages="error.username"
          >
          </v-text-field>
          <v-text-field
              label="Firstname"
              v-model="form.first_name"
              :error="error.first_name"
              :error-messages="error.first_name"
          >
          </v-text-field>
          <v-text-field
              label="Lastname"
              v-model="form.last_name"
              :error="error.last_name"
              :error-messages="error.last_name"
          >
          </v-text-field>
          <v-text-field
              label="Email"
              v-model="form.email"
              type="email"
              :rules="[rules.required]"
              :error="error.email"
              :error-messages="error.email"
          >
          </v-text-field>
          <v-text-field
              label="Password"
              v-model="form.password1"
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password ? 'text' : 'password'"
              @click:append="show_password = !show_password"
              :rules="[rules.required,rules.min]"
              hint="At least 8 characters"
              :error="!!(error.password2 || error.password1)"
              :error-messages="error.password1"
          >
          </v-text-field>
          <v-text-field
              label="Password Confirmed"
              v-model="form.password2"
              :append-icon="show_password2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password2 ? 'text' : 'password'"
              @click:append="show_password2 = !show_password2"
              :rules="[rules.required,rules.min,rulePasswordMatch]"
              :error="!!(error.password2 || error.password1)"
              :error-messages="error.password2"
          >
          </v-text-field>
          <div class="text-center ">
            <v-btn
                color="primary"
                class="black--text"
                large
                @click="registerUser"
            >
              Register
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import Base from '@/components/share/base/Base'

export default {
  extends: Base,
  name: 'Register',
  components: {},
  data: () => ({
    show_password: false,
    show_password2: false,
    rules: {
      required: value => !!value || 'Required.',
      min: function (v) {
        return (v && v.length >= 8) || 'Min 8 characters'
      }
    },
    form: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password2: ""
    },
  }),
  methods: {
    rulePasswordMatch(value) {
      if (value !== this.form.password1) {
        return "Password not match"
      } else {
        return true
      }
    },
    async registerUser() {
      let data = await this.$store.dispatch('user/registerUser', this.form)
      if (data) {
        alert("register success")
        await this.$router.push({name: 'Login'})
      } else {
        alert("register failed")
      }
    }
  }
}
</script>
