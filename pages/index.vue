<template>
  <Login />
</template>

<script>
export default {
  name: 'IndexPage',

  components: {
    Login: () => import('@/components/auth/Login.vue')
  }
}
</script>
