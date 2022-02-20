<template>
  <div class="flex items-center justify-center">
    <Login />
  </div>
</template>
<script>
export default {
  name: 'LoginPage',

  components: {
    Login: () => import('~/components/auth/LoginScreen')
  },

  middleware: 'auth',
  auth: 'guest'
}
</script>
