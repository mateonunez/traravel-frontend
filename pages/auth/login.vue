<template>
  <Login />
</template>
<script>
export default {
  name: 'LoginPage',

  components: {
    Login: () => import('@/components/auth/Login.vue')
  },

  middleware: 'auth',
  auth: 'guest'
}
</script>
