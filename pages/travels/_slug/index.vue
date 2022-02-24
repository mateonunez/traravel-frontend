<template>
  <div class="flex flex-col w-full h-full sm:mx-auto">
    <!-- Navigators -->
    <div class="flex flex-row justify-between mt-7 mx-7">
      <!-- Left Navigator -->
      <Navigator @click="$router.go(-1)">
        <ArrowLeft
          class="w-8 h-8 transition duration-300 transform text-slate-800 hover:scale-110"
        />
      </Navigator>

      <!-- Cross Navigator -->
      <Navigator @click="$router.push('/travels')">
        <Cross
          class="w-8 h-8 transition duration-300 transform text-slate-800 hover:rotate-90"
        />
      </Navigator>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full px-4 py-8 mx-auto mt-20 md:w-1/2">
      <!-- Title -->
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col w-full">
          <h1 class="text-2xl font-bold leading-none text-slate-800">
            {{ travel.name }}
          </h1>
        </div>
      </div>
    </div>

    <!-- Travel Edit Create -->
    <div class="flex flex-col w-full sm:mx-auto">
      <TravelShow :travel="travel" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelShowPage',

  components: {
    Navigator: () => import('~/components/common/Navigator'),
    ArrowLeft: () => import('~/components/icons/ArrowLeft'),
    Cross: () => import('~/components/icons/Cross'),
    TravelShow: () => import('~/components/travels/TravelShow')
  },

  async fetch() {
    try {
      const { slug } = this.$route.params

      await this.$store.dispatch('travels/show', slug)
    } catch (e) {
      console.error(e)
      this.$nuxt.error({ statusCode: 404, message: 'Travel not found' })
    }
  },

  computed: {
    travel() {
      return this.$store.getters['travels/getEntity']
    }
  },

  mounted() {
    console.log(this.travel)
  }
}
</script>
