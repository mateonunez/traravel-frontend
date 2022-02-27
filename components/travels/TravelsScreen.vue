<template>
  <div class="flex flex-col py-8 mx-8 mt-10 sm:mx-auto md:w-1/2">
    <!-- Title -->
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold leading-none text-slate-800">Travels</h1>
    </div>

    <!-- Add new -->
    <div v-if="imAdmin" class="flex flex-row justify-center mt-4 ml-auto">
      <button
        class="w-full px-4 py-2 mr-2 text-sm font-bold bg-red-500 rounded-md text-slate-100"
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
        :tours="travel.tours"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TravelsScreen',

  components: {
    TravelCard: () => import('~/components/travels/TravelCard')
  },

  async fetch() {
    await this.$store.dispatch('travels/fetch')
  },

  computed: {
    ...mapGetters(['imAdmin']),

    travels() {
      return this.$store.getters['travels/get']
    }
  }
}
</script>
