<template>
  <div>
    <div v-if="type == 'email'">
      <v-text-field
        v-model="email"
        :type="type"
        :label="label"
        :rules="rules"
        variant="outlined"
      />
    </div>
    <div v-if="type == 'password'">
      <v-text-field
        v-model="password"
        :type="type"
        :label="label"
        :rules="rules"
        variant="outlined"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    label:{
      type: String,
      default: ""
    },
    rules: {
      type: Array,
      default: []
    }
  },
  data () {
    return{
        value: ""
    }
  },
  computed: {
    email:{
      get () {
          return this.value
      },
      set (newValue) {  
        this.value = newValue
        return this.$emit('setEmail', newValue) 
      },
    },
    password: {
      get () {
        return this.value
      },
      set (newValue){
        this.value = newValue
        return this.$emit("setPassword",newValue)
      },
    }
  }
}
</script>