<template>
  <div class="w-full h-full">
    <NavigatorBar />

    <div class="flex flex-col w-full h-full sm:mx-auto">
      <Travels />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterPage',

  components: {
    NavigatorBar: () => import('~/components/common/NavigatorBar'),
    Travels: () => import('~/components/travels/TravelsScreen')
  },

  middleware: 'auth',

  computed: {
    user() {
      return this.$auth.$state.user
    }
  }
}
</script>
