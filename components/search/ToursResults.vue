<template>
  <div>
    <div
      v-for="tour in tours"
      :key="tour.id"
      class="flex flex-row items-center w-full mt-2 mb-4 transition duration-300 ease-linear transform rounded-lg cursor-pointer hover:scale-105 hover:bg-gray-50"
    >
      <div class="flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          :alt="tour.name"
          class="object-cover w-16 h-16 rounded-xl"
        />
      </div>
      <div class="flex flex-col justify-center ml-4">
        <div class="flex flex-row">
          <div class="flex flex-col justify-center">
            <span class="font-bold">{{ tour.name }}</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-row">
            <span class="text-xs leading-none text-slate-800">
              <b>Data di inizio:</b>
              {{ tour.startingDate | dateForHumans }}
            </span>
          </div>
          <div class="flex flex-row">
            <span class="text-xs leading-none text-slate-800">
              <b>Data di fine:</b>
              {{ tour.endingDate | dateForHumans }}
            </span>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-sm text-slate-600">
            {{ tour.price | currencyForHumans }}
          </span>
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
