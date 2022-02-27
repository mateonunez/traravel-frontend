<template>
  <div class="w-full h-full">
    <NavigatorBar />

    <div class="flex flex-col w-full h-full sm:mx-auto">
      <Users v-if="imEditor" />
      <Travels />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RegisterPage',

  components: {
    NavigatorBar: () => import('~/components/common/NavigatorBar'),
    Travels: () => import('~/components/travels/TravelsScreen'),
    Users: () => import('~/components/users/UserScreen')
  },

  middleware: 'auth',

  computed: {
    ...mapGetters(['imEditor']),

    user() {
      return this.$auth.$state.user
    }
  },

  mounted() {
    // console.log(this.user)
  }
}
</script>
