<template>
  <div>
    <div
      v-for="travel in travels"
      :key="travel.id"
      class="flex flex-row items-center w-full mt-2 mb-4 transition duration-300 ease-linear transform rounded-lg cursor-pointer hover:scale-105 hover:bg-gray-50"
      :title="`${travel.description.substring(0, 140)}...`"
      @click="$router.push(`/travels/${travel.slug}`)"
    >
      <div class="flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          alt="tour.name"
          class="object-cover w-16 h-16 rounded-xl"
        />
      </div>
      <div class="flex flex-col justify-center ml-4">
        <div class="flex flex-row">
          <div class="flex flex-col justify-center">
            <span class="font-bold">{{ travel.name }}</span>
          </div>
          <div class="flex flex-col"></div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex flex-col">
            <!-- <span class="text-sm">
                      {{ computeTravelPrice(travel) | currencyForHumans }}
                    </span> -->
          </div>
          <div class="flex flex-col ml-2">
            <span class="text-xs text-slate-600">
              {{ travel.numberOfDays }}☀️ / {{ travel.numberOfNights }}🌑
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyForHumans } from '~/lib/filters/currency'
export default {
  name: 'TravelsResults',

  filters: {
    currencyForHumans
  },

  props: {
    travels: {
      type: Array,
      default: () => []
    }
  }
}
</script>
