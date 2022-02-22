<template>
  <div class="flex flex-col justify-center my-4 bg-white rounded-xl">
    <!-- Header -->
    <div class="p-4">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col justify-center w-2/3">
          <span class="font-bold">{{ name }}</span>
        </div>
        <div class="flex flex-col justify-center">
          <span
            :title="`Durata del Travel: ${numberOfDays} giorni e ${numberOfNights} notti`"
            class="text-sm text-slate-600"
          >
            {{ numberOfDays }}☀️ / {{ numberOfNights }}🌑
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
      <div class="flex flex-row justify-around mt-4">
        <button
          class="w-full px-4 py-2 mr-2 text-sm font-bold bg-red-500 rounded-md md:max-w-xs max-w text-slate-100"
        >
          {{ mainButtonLabel }}
        </button>

        <button
          class="w-full px-4 py-2 ml-2 text-sm font-bold text-red-700 bg-red-500 rounded-md md:max-w-xs bg-opacity-10"
        >
          {{ secondaryButtonLabel }}
        </button>
      </div>

      <!-- Footer -->
      <div
        v-if="hasMoreDetails"
        class="flex flex-col items-center justify-center my-4"
      >
        <div class="flex flex-row">
          <button
            class="focus:outline-none"
            aria-disabled="true"
            @click="panelExpanded = !panelExpanded"
          >
            <ChevronDown
              v-if="!panelExpanded"
              class="w-8 h-8 transition duration-300 transform text-slate-700 hover:scale-110 hover:text-slate-900"
            />

            <ChevronUp
              v-else
              class="w-8 h-8 transition duration-300 transform text-slate-700 hover:scale-110 hover:text-slate-900"
            />
          </button>
        </div>

        <!-- Travel Moods -->

        <!-- Travel description -->
        <div
          :class="
            cn(
              'flex flex-col text-center mt-1 transition transform duration-500 ease-in-out w-full',
              panelExpanded ? 'opacity-100' : 'opacity-0'
            )
          "
        >
          <div v-if="panelExpanded">
            <!-- Moods -->

            <div class="flex flex-col mt-2 text-left">
              <span class="mb-1 font-bold text-md">🕶 Moods</span>
              <div
                v-for="mood in moods"
                :key="mood.id"
                class="flex flex-row justify-between mx-4 mt-2 md:mx-16"
              >
                <span class="w-1/3 text-sm italic">{{ mood.name }}</span>
                <span
                  class="text-sm font-bold"
                  :style="`color: ${getRatingColor(mood.pivot.rating)}`"
                >
                  {{ mood.pivot.rating }}
                </span>
                <span class="">{{ mood.emoji }}</span>
              </div>
            </div>

            <!-- Descrpition -->
            <div class="flex flex-col mt-2 text-left">
              <span class="font-bold text-md">📝 Descrizione</span>
              <span class="mt-2 ml-4 text-xs">
                {{ description }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cn from 'classnames'
import colors from 'tailwindcss/colors'
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
    },
    tours: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    panelExpanded: false
  }),

  computed: {
    ...mapGetters(['imAdmin']),

    mainButtonLabel() {
      return this.imAdmin ? 'Modifica' : 'Prenota'
    },

    secondaryButtonLabel() {
      return this.imAdmin ? 'Elimina' : 'Ulteriori dettagli'
    },

    hasMoreDetails() {
      return this.description || this.moods.length > 0
    }
  },

  mounted() {
    console.log(this.moods)
  },

  methods: {
    cn,

    // Returns the hext because color classes are not rendered
    getRatingColor(rating) {
      const base = rating > 60 ? 'emerald' : rating > 30 ? 'amber' : 'red'
      const shade = Math.floor(rating / 10) * 100
      const hex = colors[base][shade]

      return hex || '#000'
    }
  }
}
</script>
