<template>
  <TravelsScreen />
</template>
<script>
export default {
  name: 'RegisterPage',

  components: {
    TravelsScreen: () => import('~/components/travels/TravelsScreen')
  },

  middleware: 'auth',

  computed: {
    user() {
      return this.$auth.$state.user
    }
  }
}
</script>
