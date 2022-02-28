<template>
  <div class="flex items-center justify-center mx-auto">
    <div class="flex flex-col justify-center max-w-2xl py-20 mx-8 fit">
      <!-- Welcome messages -->
      <div class="flex flex-col max-w-md">
        <h1 class="text-5xl font-bold">Vivi un'espirienza unica!</h1>
        <span className="-mt-1 text-xs">
          Registrati per vivere al meglio le nostre avventure
        </span>
      </div>

      <UserEditCreate class="py-20" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterPage',

  components: {
    UserEditCreate: () => import('~/components/users/UserEditCreate')
  },

  middleware: 'auth',
  auth: 'guest'
}
</script>
