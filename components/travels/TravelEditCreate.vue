<template>
  <div class="w-full h-full px-6 py-5 text-white bg-red-500 bg-opacity-90">
    <form class="flex flex-col my-8 md:w-2/3 md:mx-auto" @submit="handleSubmit">
      <!-- Name input -->
      <div class="relative mb-5">
        <span class="font-bold">Nome</span>
        <label>
          <input
            v-model="payload.name"
            type="text"
            placeholder="Nome"
            :class="
              cn(
                'w-full appearance-none text-slate-900 py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none'
              )
            "
          />
        </label>
        <LocationIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>

      <!-- Slug input -->
      <div class="relative mb-5">
        <div>
          <span class="font-bold">Slug</span>
          <label>
            <input
              v-model="payload.slug"
              type="text"
              placeholder="Slug"
              :disabled="!isSlugEditable"
              :class="
                cn(
                  'w-full appearance-none disabled:bg-gray-300 text-slate-900 py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none'
                )
              "
            />
          </label>
          <LinkIcon
            class="absolute bottom-0 left-0 w-6 h-6 -mb-1 transform translate-x-1/2 -translate-y-8 text-slate-500"
          />
        </div>
        <div class="justify-center mt-1 text-xs text-right">
          <input
            id="editSlug"
            type="checkbox"
            class="w-3 h-3 border rounded-md checked:bg-red-700 checked:border-red-700"
            @change="isSlugEditable = !isSlugEditable"
          />
          <label class="inline-block" for="editSlug">Modifica slug</label>
        </div>
      </div>

      <!-- Description -->
      <div class="relative mb-5">
        <span class="font-bold">Descrizione</span>
        <label>
          <textarea
            v-model="payload.description"
            type="text"
            placeholder="Slug"
            rows="8"
            :class="
              cn(
                'w-full appearance-none text-slate-900 p-3 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none'
              )
            "
          />
        </label>
      </div>

      <!-- Tours -->
      <div class="relative mb-5">
        <div class="flex flex-row justify-between">
          <span class="font-bold">Tours</span>
        </div>
        <div
          class="flex flex-col justify-center bg-white rounded-lg text-slate-900"
        >
          <!-- Tours -->
          <div
            v-for="tour in travel.tours"
            :key="tour.id"
            class="flex flex-row justify-start p-3 my-2"
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
                class="flex flex-row justify-between w-1/2 mt-2 text-xs md:w-1/3"
              >
                <button
                  type="button"
                  class="self-end text-amber-500 hover:text-amber-700"
                  @click="openTourDialog(tour)"
                >
                  Modifica
                </button>
                <button
                  type="button"
                  class="self-end text-red-500 hover:text-red-700"
                >
                  Elimina
                </button>
              </div>
            </div>
          </div>

          <div
            title="Aggiungi un nuovo Tour"
            class="flex flex-row items-center justify-center w-full py-2 mt-4 text-red-900 bg-red-100 rounded-b-lg cursor-pointer hover:bg-red-900 hover:text-red-100"
            @click="openTourDialog()"
          >
            <button type="button">
              <PlusIcon />
            </button>
          </div>

          <!-- TODO Moods -->
          <!-- isPublic is missing -->
        </div>
      </div>

      <!-- isPublic -->
      <div class="flex p-3 mb-5 bg-white rounded-lg">
        <label class="flex items-center" for="isPublic">
          <input
            id="isPublic"
            v-model="payload.isPublic"
            type="checkbox"
            class="w-6 h-6 border rounded-md checked:bg-red-700 checked:border-red-700"
          />
          <span class="ml-2 text-sm font-bold leading-none text-gray-900">
            Pubblica questo viaggio
          </span>
        </label>
      </div>

      <!-- Submit -->
      <div
        class="flex flex-row items-center justify-center mt-auto text-red-500"
      >
        <button
          :disabled="buttonDisabled"
          type="submit"
          :class="
            cn(
              'w-full px-4 py-2 font-bold rounded-lg flex justify-center',
              buttonDisabled ? 'bg-red-500' : 'bg-red-700 hover:bg-red-900'
            )
          "
        >
          <Spinner v-if="loading" class="text-slate-300" color="slate-500" />
          <span
            v-else
            :class="buttonDisabled ? 'text-slate-200' : 'text-slate-200'"
          >
            Effettua modifiche
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import cn from 'classnames'
import { currencyForHumans } from '~/lib/filters/currency'
import { dateForHumans } from '~/lib/filters/date'
import { kebapCase } from '~/lib/helpers/string'

export default {
  name: 'TravelEditCreate',

  filters: {
    currencyForHumans,
    dateForHumans
  },

  components: {
    LocationIcon: () => import('~/components/icons/Location'),
    LinkIcon: () => import('~/components/icons/Link'),
    PlusIcon: () => import('~/components/icons/Plus'),
    Spinner: () => import('~/components/ui/Spinner')
  },

  props: {
    travel: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    payload: {},
    loading: false,
    buttonDisabled: false,
    isSlugEditable: false
  }),

  computed: {
    isEditing() {
      return !!this.travel
    },
    isCreating() {
      return !this.isEditing
    }
  },

  watch: {
    travel(newValue) {
      if (newValue) {
        this.payload = { ...newValue }
      }
    },
    'payload.name'(newValue) {
      this.payload.slug = newValue ? kebapCase(newValue) : ''
    }
  },

  mounted() {
    if (this.travel) {
      this.payload = { ...this.travel }
    }
  },

  methods: {
    cn,
    openTourDialog(tour) {
      if (!tour) {
        console.log('creating tour')
      } else {
        console.log('editing tour')
      }
    },
    preparePayload() {
      return this.payload
    },
    handleSubmit(e) {
      e.preventDefault()

      if (this.isEditing) {
        this.edit()
      } else {
        this.create()
      }
    },
    async edit() {
      const payload = this.preparePayload()

      this.buttonDisabled = true
      this.loading = true

      try {
        await this.$store.dispatch('travels/update', {
          id: this.travel.id,
          payload
        })

        this.loading = false
        this.buttonDisabled = false

        this.$store.dispatch('ui/showMessage', {
          message: 'Travel modificato con successo'
        })

        this.$router.push('/travels')
      } catch ({ response }) {
        const {
          data: { message }
        } = response

        this.loading = false
        this.buttonDisabled = false
        this.$store.dispatch('ui/showError', { message })
      }
    },
    async create() {
      await Promise.resolve(true)
    }
  }
}
</script>
