<template>
  <div class="">
    <div
      v-for="travel in travels"
      :key="travel.id"
      class="flex flex-col items-center w-full mt-2 mb-4 transition duration-300 ease-linear transform rounded-lg cursor-pointer md:flex-row hover:scale-105 hover:bg-gray-50"
      :title="`${travel.description.substring(0, 140)}...`"
      @click="$router.push(`/travels/${travel.slug}`)"
    >
      <!-- Image -->
      <div class="flex flex-col my-1 sm:flex-row lg:items-end">
        <img
          src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          alt="tour.name"
          class="object-cover w-16 h-16 rounded-xl"
        />
      </div>

      <!-- Name -->
      <div
        class="flex flex-col items-center my-1 text-center md:ml-4 sm:flex-row"
      >
        <span class="font-bold md:text-left">{{ travel.name }}</span>
        <span class="text-xs text-slate-600 md:ml-2">
          {{ travel.numberOfDays }}☀️ / {{ travel.numberOfNights }}🌑
        </span>
      </div>

      <!-- Tag -->
      <div
        class="flex flex-col items-center justify-center mx-auto my:1 md:ml-auto md:mr-2"
      >
        <div
          class="flex justify-center items-center px-1 py-1 text-xs font-bold text-green-700 uppercase bg-green-200 rounded-full text-[7px] leading-sm w-20 text-center"
        >
          Team Choice
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
