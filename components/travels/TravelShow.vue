<template>
  <div class="w-full h-full px-6 py-5 text-white bg-red-500 bg-opacity-90">
    <div class="flex flex-col my-8 md:w-2/3 xl:w-1/3 md:mx-auto">
      <!-- Description -->
      <div class="flex flex-row justify-center">
        <div class="w-full p-4 text-gray-800 bg-white rounded-lg shadow">
          <div class="mb-2">
            <div class="h-3 text-3xl text-left text-gray-600">“</div>
            <p class="px-4 text-sm text-center text-gray-600">
              {{ travel.description }}
            </p>
            <div class="h-3 text-3xl text-right text-gray-600">”</div>
          </div>
        </div>
      </div>

      <!-- Tours -->
      <div
        class="flex flex-col justify-center mt-10 bg-white rounded-lg text-slate-900"
      >
        <!-- Tours -->
        <div
          v-for="(tour, index) in travel.tours"
          :key="index"
          class="flex flex-row items-center justify-start p-3 my-2"
        >
          <TourCard :tour="tour" :travel="travel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyForHumans } from '~/lib/filters/currency'
import { dateForHumans } from '~/lib/filters/date'

export default {
  name: 'TravelShow',

  filters: {
    currencyForHumans,
    dateForHumans
  },

  components: {
    TourCard: () => import('~/components/tours/TourCard.vue')
  },

  props: {
    travel: {
      type: Object,
      required: true
    }
  }
}
</script>
