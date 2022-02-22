<template>
  <Travels />
</template>
<script>
export default {
  name: 'RegisterPage',

  components: {
    Travels: () => import('~/components/travels/TravelsScreen')
  },

  middleware: 'auth',

  computed: {
    user() {
      return this.$auth.$state.user
    }
  },

  mounted() {
    console.log(this.user)
  }
}
</script>
