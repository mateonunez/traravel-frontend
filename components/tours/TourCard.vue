<template>
  <div class="flex flex-row w-full">
    <div class="flex flex-col w-40">
      <!-- Image -->
      <img
        src="https://via.placeholder.com/100"
        :alt="tour.name"
        class="object-cover w-20 h-20 rounded-xl"
      />
    </div>

    <!-- Details -->
    <div class="flex flex-col justify-center w-full mx-4">
      <div class="flex flex-row">
        <span class="text-lg font-bold">{{ tour.name }}</span>
      </div>
      <!-- Startaing Date -->
      <div class="flex flex-row">
        <span class="text-sm text-slate-800">
          <b>Data di inizio:</b>
          {{ tour.startingDate | dateForHumans }}
        </span>
      </div>
      <div class="flex flex-row">
        <span class="text-sm text-slate-800">
          <b>Data di fine:</b>
          {{ tour.endingDate | dateForHumans }}
        </span>
      </div>
      <div class="flex flex-row">
        <span class="text-xs text-slate-600">
          {{ tour.price | currencyForHumans }}
        </span>
      </div>

      <!-- Actions -->
      <div
        v-if="editable"
        class="flex flex-row justify-between w-1/2 mt-2 text-xs md:w-1/3"
      >
        <button
          type="button"
          class="self-end text-amber-500 hover:text-amber-700"
          @click="update"
        >
          Modifica
        </button>
        <button
          type="button"
          class="self-end text-red-500 hover:text-red-700"
          @click="destroy"
        >
          Elimina
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyForHumans } from '~/lib/filters/currency'
import { dateForHumans } from '~/lib/filters/date'

export default {
  name: 'TourCard',

  filters: {
    currencyForHumans,
    dateForHumans
  },

  props: {
    editable: {
      type: Boolean,
      default: false
    },
    tour: {
      type: Object,
      required: true
    },
    travel: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: undefined
    }
  },

  methods: {
    update() {
      this.$emit('update', {
        ...this.tour,
        travelId: this.travel.id,
        index: this.index
      })
    },
    destroy() {
      this.$emit('destroy', this.tour)
    }
  }
}
</script>
