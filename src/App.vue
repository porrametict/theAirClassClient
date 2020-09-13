<template>
  <v-app>
    <Base/>
    <router-view/>
  </v-app>
</template>
<script>

import Base from "@/components/share/base/Base";

export default {
  name: 'App',
  components: {Base},
  data: () => ({
    //
  }),
  created() {
    // Add a request interceptor
    let self = this
    window.axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      self.$store.commit('spinner/updateVisible', true)
      return config;
    }, function (error) {
      // Do something with request error
      self.$store.commit('spinner/updateVisible', false)
      return Promise.reject(error);
    });
    // Add a response interceptor
    window.axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      self.$store.commit('spinner/updateVisible', false)
      return response;
    }, function (error) {
      self.$store.commit('spinner/updateVisible', false)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
  }
};
</script>
