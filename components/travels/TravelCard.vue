<template>
  <div class="flex flex-col justify-center my-4 bg-white rounded-xl">
    <!-- Header -->
    <div class="p-4">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col justify-center w-2/3">
          <span class="font-bold">{{ name }}</span>
        </div>
        <div class="flex flex-col justify-center">
          <span class="text-xs text-slate-600">
            {{ numberOfDays }}☀️/{{ numberOfNights }}🌑
          </span>
        </div>
      </div>

      <!-- Body -->
      <div class="flex flex-col mt-4">
        <div
          v-for="tour in tours"
          :key="tour.id"
          class="flex flex-row justify-start my-2"
        >
          <div class="flex flex-col">
            <!-- Image -->
            <img
              src="https://via.placeholder.com/100"
              :alt="tour.name"
              class="object-cover w-20 h-20 rounded-xl"
            />
          </div>

          <!-- Details -->
          <div class="flex flex-col justify-center mx-4">
            <div class="flex flex-row">
              <span class="font-bold">{{ tour.name }}</span>
            </div>
            <div class="flex flex-row">
              <span class="text-xs text-slate-600">
                {{ tour.price | currencyForHumans }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-row justify-between mt-4">
        <button
          class="w-full px-4 py-2 mr-2 text-slate-100 bg-red-500 rounded-md text-sm font-bold"
        >
          {{ mainButtonLabel }}
        </button>

        <button
          class="w-full px-4 py-2 ml-2 bg-red-500 bg-opacity-10 rounded-md text-red-700 font-bold text-sm"
        >
          {{ secondaryButtonLabel }}
        </button>
      </div>

      <!-- Footer -->
      <div
        v-if="description"
        class="flex flex-row justify-center items-center mt-4"
      >
        <div>
          <button
            class="focus:outline-none"
            aria-disabled="true"
            @click="panelExpanded = !panelExpanded"
          >
            <ChevronDown
              v-if="!panelExpanded"
              class="h-8 w-8 text-slate-700 transition transform duration-300 hover:scale-110 hover:text-slate-900"
            />

            <ChevronUp
              v-else
              class="h-8 w-8 text-slate-700 transition transform duration-300 hover:scale-110 hover:text-slate-900"
            />
          </button>
        </div>
      </div>

      <!-- Travel description -->
      <div
        :class="
          cn(
            'text-center mt-1 transition transform duration-500 ease-in-out block',
            panelExpanded ? 'opacity-100' : 'opacity-0'
          )
        "
      >
        <span v-if="panelExpanded">{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import cn from 'classnames'
import { mapGetters } from 'vuex'
import { currencyForHumans } from '@/lib/filters/currency'

export default {
  name: 'TravelCard',

  filters: {
    currencyForHumans
  },

  components: {
    ChevronDown: () => import('~/components/icons/ChevronDown'),
    ChevronUp: () => import('~/components/icons/ChevronUp')
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    slug: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    numberOfDays: {
      type: Number,
      default: null
    },
    numberOfNights: {
      type: Number,
      default: null
    },
    moods: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    panelExpanded: false,
    tours: [
      {
        id: '94682e59-cbbd-44f5-861f-fb06c0ce18da',
        travelId: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
        name: 'ITICE20211101',
        startingDate: '2021-11-01',
        endingDate: '2021-11-08',
        price: 199900
      },
      {
        id: '90155d92-01e5-4c4b-a5a8-e24011fa8418',
        travelId: 'cbf304ae-a335-43fa-9e56-811612dcb601',
        name: 'ITARA20211221',
        startingDate: '2021-12-21',
        endingDate: '2021-12-28',
        price: 189900
      },
      {
        id: '9cefe1bc-eeb7-4d6d-b572-8a7aea2688d1',
        travelId: 'cbf304ae-a335-43fa-9e56-811612dcb601',
        name: 'ITARA20211221',
        startingDate: '2022-01-03',
        endingDate: '2022-01-10',
        price: 149900
      }
    ]
  }),

  computed: {
    ...mapGetters(['imAdmin']),

    mainButtonLabel() {
      return this.imAdmin ? 'Modifica' : 'Prenota'
    },

    secondaryButtonLabel() {
      return this.imAdmin ? 'Elimina' : 'Ulteriori dettagli'
    }
  },

  methods: {
    cn
  }
}
</script>
