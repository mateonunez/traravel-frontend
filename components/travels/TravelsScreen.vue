<template>
  <div class="flex flex-col w-full h-full sm:mx-auto">
    <!-- Navigators -->
    <div class="flex flex-row justify-between mt-7 mx-7">
      <!-- Left Navigator -->
      <Navigator @click="$router.go(-1)">
        <ArrowLeft
          class="h-8 w-8 text-slate-800 transition transform duration-300 hover:scale-110"
        />
      </Navigator>

      <!-- Cross Navigator -->
      <Navigator @click="$router.push('/')">
        <Cross
          class="h-8 w-8 text-slate-800 transition transform duration-300 hover:rotate-90"
        />
      </Navigator>
    </div>

    <!-- Content -->
    <div class="flex flex-col py-8 mx-8 mt-20 sm:mx-auto md:w-1/2">
      <!-- Title -->
      <div class="flex flex-col">
        <h1 class="text-2xl leading-none text-slate-800 font-bold">Travels</h1>
      </div>

      <!-- Add new -->
      <div class="flex flex-row justify-center ml-auto mt-4">
        <button
          class="w-full px-4 py-2 mr-2 text-slate-100 bg-red-500 rounded-md text-sm font-bold"
          @click="$router.push('/travels/create')"
        >
          Nuovo Travel
        </button>
      </div>

      <!-- Travels -->
      <div v-for="travel in travels" :key="travel.id" class="flex flex-col">
        <TravelCard
          :public="travel.isPublic"
          :slug="travel.slug"
          :name="travel.name"
          :description="travel.description"
          :number-of-days="travel.numberOfDays"
          :number-of-nights="travel.numberOfNights"
          :moods="travel.moods"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelsScreen',

  components: {
    Navigator: () => import('~/components/common/Navigator'),
    ArrowLeft: () => import('~/components/icons/ArrowLeft'),
    Cross: () => import('~/components/icons/Cross'),
    TravelCard: () => import('~/components/travels/TravelCard')
  },

  async fetch() {
    await this.$store.dispatch('travels/fetch')
  },

  computed: {
    travels() {
      return this.$store.getters['travels/get']
    }
  },

  mounted() {
    console.log(this.travels)
  }
}
</script>
