<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-10 w-screen overflow-y-auto text-gray-700"
  >
    <div
      class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
        &#8203;
      </span>

      <div
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle w-[95vw] xl:w-[70vw]"
      >
        <div class="p-5 bg-white sm:p-6">
          <div class="flex flex-col h-full">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div class="flex flex-row items-center">
                <h3
                  id="modal-title"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{ title }}
                </h3>
                <span
                  v-if="isEditing"
                  class="ml-4 text-sm leading-5 text-gray-500"
                >
                  {{ tour.name }}
                </span>
              </div>

              <!-- Form data -->
              <form
                class="flex flex-col mt-8 lg:w-2/3 md:mx-auto"
                @submit="submit"
                @input="errors = []"
              >
                <div class="relative mb-5">
                  <!-- Starting Date -->
                  <div class="relative mb-5">
                    <span class="font-bold">Scegli le date</span>
                    <HotelDatePicker
                      format="DD/MM/YYYY"
                      :grid-style="false"
                      :i18n="hotelDatePickerI18n"
                      :starting-date-value="
                        payload.startingDate
                          ? new Date(payload.startingDate)
                          : null
                      "
                      :ending-date-value="
                        payload.endingDate ? new Date(payload.endingDate) : null
                      "
                      @period-selected="handlePeriodSelected"
                    />
                  </div>

                  <!-- Ending Date -->
                  <!-- Name -->
                  <span class="font-bold">Nome</span>
                  <label>
                    <input
                      v-model="payload.name"
                      type="text"
                      placeholder="Nome"
                      class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg appearance-none text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </label>
                  <LocationIcon
                    class="absolute bottom-0 left-0 w-6 h-6 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>

                <!-- Description -->
                <div class="relative mb-5">
                  <span class="font-bold">Descrizione</span>
                  <label>
                    <textarea
                      v-model="payload.description"
                      type="text"
                      placeholder="Descrizione"
                      rows="3"
                      class="w-full p-3 transition ease-in-out border border-solid rounded-lg appearance-none text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                  </label>
                </div>

                <!-- Price -->
                <div class="relative">
                  <span class="font-bold">Prezzo</span>
                  <label>
                    <input
                      v-model="payload.price"
                      type="number"
                      placeholder="Prezzo"
                      min="1"
                      step="any"
                      class="w-full pt-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg appearance-none text-slate-900 focus:border-blue-500 focus:outline-none"
                    />
                    <EuroIcon
                      class="absolute bottom-0 left-0 w-6 h-6 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Error messages -->
        <div
          v-if="errors.length > 0"
          class="flex flex-row justify-center w-full"
        >
          <div class="w-2/5 mb-2 border-l-8 border-red-900 bg-red-50">
            <div class="flex items-center">
              <div class="p-2">
                <div class="flex items-center">
                  <div class="ml-2">
                    <CrossIcon class="w-6 h-6 font-bold text-red-500" />
                  </div>
                  <p class="px-6 py-4 text-lg font-semibold text-red-900">
                    Controlla i seguenti errori:
                  </p>
                </div>
                <div class="px-16 mb-4">
                  <li
                    v-for="(error, index) in errors"
                    :key="index"
                    class="text-sm font-bold text-red-500 text-md"
                  >
                    {{ error }}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-4 py-4 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="submit"
          >
            Conferma
          </button>
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-red-500 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="hide"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css'
import cn from 'classnames'
import { hotelDatePickerI18n } from '~/lib/config/i18n'

export default {
  name: 'TourEditCreateDialog',

  components: {
    CrossIcon: () => import('~/components/icons/Cross'),
    LocationIcon: () => import('~/components/icons/Location'),
    EuroIcon: () => import('~/components/icons/Euro'),
    HotelDatePicker: () => import('vue-hotel-datepicker')
  },

  props: {
    tour: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    hotelDatePickerI18n,
    isVisible: false,
    payload: {},
    errors: []
  }),

  computed: {
    isEditing() {
      return !!this.tour
    },
    isCreating() {
      return !this.isEditing
    },
    title() {
      return this.isEditing ? 'Modifica Tour' : 'Nuovo Tour'
    }
  },

  watch: {
    tour(newValue) {
      console.log(newValue)
      this.payload = { ...newValue }
    }
  },

  mounted() {
    this.payload = {}
  },

  methods: {
    cn,
    show() {
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
    },
    validate() {
      this.errors = []
      if (!this.payload.name) {
        this.errors.push('Nome obbligatorio')
      }
      if (!this.payload.price) {
        this.errors.push('Prezzo obbligatorio')
      }
      if (!this.payload.startingDate) {
        this.errors.push('Data di inizio obbligatoria')
      }
      if (!this.payload.endingDate) {
        this.errors.push('Data di fine obbligatoria')
      }
      return this.errors.length === 0
    },
    submit() {
      const valid = this.validate()

      if (!valid) {
        return
      }

      const payload = { ...this.payload }

      if (this.isEditing) {
        this.$emit('update', payload)
      } else {
        this.$emit('store', payload)
      }
    },
    handlePeriodSelected(_, startDate, endDate) {
      this.payload.startingDate = startDate.toISOString()
      this.payload.endingDate = endDate.toISOString()
    }
  }
}
</script>

<style>
/* Changing default Vue Hotel Picker style */
.vhd__datepicker__wrapper {
  background: #fff url('~/assets/icons/calendar.svg') no-repeat 1em/1em !important;
}

.vhd__datepicker__month-button {
  background: #fff url('~/assets/icons/chevron.svg') no-repeat 0.5em/1.5em !important;
}

.vhd__datepicker__dummy-wrapper--is-active {
  border: 1px solid #f97317 !important;
}

.vhd__datepicker__month-button {
  border: 1px solid #f97317 !important;
}

.vhd__datepicker__month-day--today .vhd__datepicker__month-day-wrapper {
  border: 2px solid #f97317 !important;
}
.vhd__datepicker__month-day--valid:hover {
  background-color: #f97317 !important;
}
.vhd__datepicker__month-day--last-day-selected {
  background: #f97317 !important;
}

.vhd__datepicker__month-day--selected:hover {
  font-weight: 700;
  background-color: #f97317;
}

.vhd__datepicker__month-day--selected {
  background-color: rgb(249 115 23 / 70%);
}

.vhd__datepicker__month-day--first-day-selected,
.vhd__datepicker__month-day--last-day-selected {
  background-color: #f97317 !important;
}
</style>
