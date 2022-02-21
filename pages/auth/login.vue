<template>
  <div class="flex flex-col items-center justify-center mx-auto">
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
