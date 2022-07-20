<template>
  <div>
      <div class="mx-15 mt-15">
      <user-form-name
        :type="'email'"
        :label="'E-mail'"
        @setEmail="setEmail"
      />
      </div>
      <div class="mx-15 mt-5">
      <user-form-name
        :type="'password'"
        :label="'Password'"
        @setPassword="setPassword"
      />
      </div>
      <div class="mt-15">
      <v-row class="justify-center mt-15">
      <v-btn
        :loading="loading"
        @click="signin"
        color="#99F"
        width="300"
        class="white-text"
      >
        ログイン
      </v-btn>
      </v-row>
      </div>
      
    <v-card-text>
      {{ params }}
    </v-card-text>
          <p>
      アカウントをお持ちで無い方は
      <nuxt-link to="/auth/signup">サインアップ</nuxt-link>
      </p>
  </div>
</template>

<script>
export default {
  layout: 'beforeLogin',
  data () {
    return {
      loading: false,
      params: { email: '', password: '' } 
    }
  },
  methods: {
    signin () {
      this.loading = true
      setTimeout(() => {
        // this.formReset()
        this.loading = false
      }, 1500)
    },
    // formReset () {
    //   this.$refs.form.reset()
    //   this.params = { email: '', password: '' } 
    // },
    setEmail(val){
        this.params.email = val
    },
    setPassword(val){
        this.params.password = val
    }
  }
}
</script>