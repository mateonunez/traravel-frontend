<template>
  <section class="fixed inset-0 z-50 p-0 m-0 overflow-hidden h-sceen">
    <!-- Navigation -->
    <div
      class="flex self-center justify-end overflow-hidden shadow-xl rounded-xl full-width"
    >
      <button class="absolute z-50 p-3" @click="handleLogin">
        <LoginIcon
          class="w-8 h-8 transition duration-300 transform text-slate-200 hover:scale-110 hover:text-slate-300"
        />
      </button>
    </div>

    <!-- Background -->
    <div class="block full-height full-width">
      <img
        :src="
          backgroundImage !== null && `/images/background/${backgroundImage}`
        "
        alt=""
        aria-disabled="true"
        class="absolute top-0 left-0 block object-cover w-full h-full transition duration-1000 ease-out blur-sm"
      />

      <!-- Background Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-500 opacity-70"
      />

      <!-- Page content -->
      <div class="container mx-auto">
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <Search :destinations="travels.map(({ name }) => name)" />
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

  data: () => ({
    backgroundImage: '3.jpg'
  }),

  async fetch() {
    await this.$store.dispatch('travels/fetch')
  },

  computed: {
    user() {
      return this.$auth.$state.user
    },
    travels() {
      return this.$store.getters['travels/get']
    }
  },

  created() {
    setInterval(() => {
      this.animateBackground()
    }, 3000)
  },

  methods: {
    animateBackground() {
      this.backgroundImage = `${Math.floor(Math.random() * 5) + 1}.jpg`
    },
    handleLogin() {
      this.user
        ? this.$router.push('/auth/me')
        : this.$router.push('/auth/login')
    }
  }
}
</script>
