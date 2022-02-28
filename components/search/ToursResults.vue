<template>
  <div>
    <div
      v-for="tour in tours"
      :key="tour.id"
      class="flex flex-col items-center w-full mt-2 mb-4 transition duration-300 ease-linear transform rounded-lg cursor-pointer md:flex-row hover:scale-105 hover:bg-gray-50"
    >
      <!-- Image -->
      <div class="flex flex-col my-1 sm:flex-row lg:items-end">
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          :alt="tour.name"
          class="object-cover w-16 h-16 rounded-xl"
        />
      </div>
      <!-- Name and info -->
      <div
        class="flex flex-col items-center my-1 text-center md:items-baseline md:ml-4"
      >
        <span class="font-bold">{{ tour.name }}</span>
        <span class="text-xs leading-none text-slate-800">
          <b>Data di inizio:</b>
          {{ tour.startingDate | dateForHumans }}
        </span>
        <span class="text-xs leading-none text-slate-800">
          <b>Data di fine:</b>
          {{ tour.endingDate | dateForHumans }}
        </span>
      </div>

      <!-- Tag -->
      <div
        class="flex flex-col items-center justify-center mx-auto my:1 md:ml-auto md:mr-2"
      >
        <div
          class="flex justify-center items-center px-1 py-1 text-xs font-bold text-yellow-700 uppercase bg-yellow-200 rounded-full text-[7px] leading-sm w-20 text-center"
        >
          {{ tour.price | currencyForHumans }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyForHumans } from '~/lib/filters/currency'
import { dateForHumans } from '~/lib/filters/date'
export default {
  name: 'ToursResults',

  filters: {
    currencyForHumans,
    dateForHumans
  },

  props: {
    tours: {
      type: Array,
      default: () => []
    }
  }
}
</script>
