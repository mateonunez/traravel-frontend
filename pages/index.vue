<template>
  <div>Hello, {{ user.name }}</div>
</template>

<script>
export default {
  name: 'IndexPage',

  computed: {
    user() {
      return this.$auth.state.user
    }
  },

  mounted() {
    console.log(this.$auth)
  }
}
</script>
