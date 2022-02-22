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
        <div class="flex flex-col w-2/3">
          <h1 class="text-2xl font-bold leading-none text-slate-800">
            Modifica Travel
          </h1>
        </div>
        <div class="flex flex-col w-1/3">
          <span class="ml-2 text-sm leading-none">{{ travel.name }}</span>
        </div>
      </div>
    </div>

    <!-- Travel Edit Create -->
    <div class="flex flex-col w-full sm:mx-auto">
      <TravelEditCreate :travel="travel" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelEditPage',

  components: {
    Navigator: () => import('~/components/common/Navigator'),
    ArrowLeft: () => import('~/components/icons/ArrowLeft'),
    Cross: () => import('~/components/icons/Cross'),
    TravelEditCreate: () => import('~/components/travels/TravelEditCreate')
  },

  async fetch() {
    // maybe i should improve the error handling here
    try {
      const { slug } = this.$route.params
      await this.$store.dispatch('travels/show', slug)
    } catch (e) {
      this.$nuxt.error({ statusCode: 404, message: 'Travel not found' })
    }
  },

  computed: {
    travel() {
      return this.$store.getters['travels/getEntity']
    }
  }
}
</script>
