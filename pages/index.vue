<template>
  <section class="fixed h-sceen overflow-hidden inset-0 m-0 p-0 z-50">
    <!-- Navigation -->
    <div
      class="flex self-center justify-end overflow-hidden rounded-xl shadow-xl full-width"
    >
      <button class="absolute z-50 p-3" @click="handleLogin">
        <LoginIcon
          class="h-8 w-8 text-slate-200 transition transform duration-300 hover:scale-110 hover:text-slate-300"
        />
      </button>
    </div>

    <!-- Background -->
    <div class="block full-height full-width">
      <img
        :src="require(`~/assets/images/background/${backgroundImage}`)"
        alt=""
        aria-disabled="true"
        class="absolute block w-full h-full object-cover top-0 left-0 blur-sm"
      />

      <!-- Background Gradient -->
      <div
        class="bg-gradient-to-b from-slate-900 to-slate-500 opacity-70 absolute inset-0"
      />

      <!-- Page content -->
      <div class="container mx-auto">
        <div class="absolute inset-0 flex flex-col justify-center items-center">
          <Search />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',

  components: {
    LoginIcon: () => import('~/components/icons/Login'),
    Search: () => import('~/components/search/MainSearch')
  },

  layout: 'empty',

  middleware: 'auth',

  computed: {
    user() {
      return this.$auth.state.user
    },
    backgroundImage() {
      return `${Math.floor(Math.random() * 5) + 1}.jpg`
    }
  },

  methods: {
    handleLogin() {
      this.user
        ? this.$router.push('/auth/me')
        : this.$router.push('/auth/login')
    }
  }
}
</script>
