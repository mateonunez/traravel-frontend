<template>
  <div>Me</div>
</template>
<script>
export default {
  name: 'RegisterPage',

  middleware: 'auth',

  computed: {
    user() {
      return this.$auth.state.user
    }
  },

  mounted() {
    console.log(this.user)
  }
}
</script>
