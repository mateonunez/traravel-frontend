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
        class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle w-[95vw]"
      >
        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
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
              >
                <div class="relative mb-5">
                  <!-- Starting Date -->
                  <div class="relative mb-5">
                    <span class="font-bold">Scegli le date</span>
                    <HotelDatePicker
                      format="DD/MM/YYYY"
                      :grid-style="false"
                      :i18n="hotelDatePickerI18n"
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
                <div class="relative mb-5">
                  <span class="font-bold">Prezzo</span>
                  <label>
                    <input
                      v-model="payload.price"
                      type="number"
                      placeholder="Prezzo"
                      min="1"
                      step="any"
                      class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg appearance-none text-slate-900 focus:border-blue-500 focus:outline-none"
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
        <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
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
import { hotelDatePickerI18n } from '~/lib/config/i18n'
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css'
export default {
  name: 'TourEditCreateDialog',

  components: {
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
    isVisible: true,
    payload: {}
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
      if (newValue) {
        this.payload = { ...newValue }
      }
    }
  },

  methods: {
    show() {
      this.isVisible = true
    },
    hide() {
      this.isVisible = false
    },
    submit() {
      const payload = { ...this.payload }
      console.log(payload)

      if (this.isEditing) {
        this.$emit('update', payload)
      } else {
        this.$emit('create', payload)
      }
    },
    handlePeriodSelected(event, startDate, endDate) {
      this.payload.startingDate = startDate.toUTCString()
      this.payload.endingDate = endDate.toUTCString()
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
