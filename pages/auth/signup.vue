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
      <div class="mx-15 mt-5">
      <user-form-name
        :type="'password'"
        :label="'Password(もう一度)'"
        @setPassword="setRePassword"
      />
      </div>
      <!-- <span>
        {{ checkPassword }}
      </span> -->
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      checkPassword:"",
      params: { email: '', password: '',rePassword:"" }
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

    setEmail(val){
      this.params.email = val
    },
    setPassword(val){
      this.params.password = val
    },
    setRePassword(val){
      this.params.rePassword = val
      console.log("ここ通ってる？")
        if (this.params.password != this.params.rePassword){
          this.checkPassword = "パスワードが一致していません"
        }else{
          this.checkPassword = "パスワードが一致しました"
        }
      
    }
  }
}
</script>