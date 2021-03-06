<template>
  <div class="w-full h-full px-6 py-5 text-white bg-red-500 bg-opacity-90">
    <form
      class="flex flex-col my-8 md:w-2/3 xl:w-1/3 md:mx-auto"
      @submit="handleSubmit"
    >
      <!-- Name input -->
      <div class="relative mb-5">
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
              class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg appearance-none disabled:bg-gray-300 text-slate-900 focus:border-blue-500 focus:outline-none"
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
            class="w-3 h-3 border rounded-md accent-red-700"
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
            class="w-full p-3 transition ease-in-out border border-solid rounded-lg appearance-none text-slate-900 focus:border-blue-500 focus:outline-none"
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
            v-for="(tour, index) in travel.tours"
            :key="index"
            class="flex flex-row items-center justify-start p-3 my-2"
          >
            <TourCard
              editable
              :tour="tour"
              :travel="travel"
              :index="index"
              @update="openTourDialog"
              @destroy="destroy"
            />
          </div>

          <div
            title="Aggiungi un nuovo Tour"
            class="flex flex-row items-center justify-center w-full py-2 text-red-900 bg-red-100 rounded-lg cursor-pointer hover:bg-red-900 hover:text-red-100"
            @click="openTourDialog()"
          >
            <button type="button">
              <PlusIcon />
            </button>
          </div>

          <!-- TODO Moods -->
        </div>
      </div>

      <!-- isPublic -->
      <div class="flex p-3 mb-5 bg-white rounded-lg">
        <label class="flex items-center" for="isPublic">
          <input
            id="isPublic"
            v-model="payload.isPublic"
            type="checkbox"
            class="w-6 h-6 border accent-red-700"
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

    <TourEditCreateDialog
      ref="tourEditCreateDialog"
      :tour="tourEntity"
      @update="updateTour"
      @store="storeTour"
    />
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
    Spinner: () => import('~/components/ui/Spinner'),
    TourEditCreateDialog: () =>
      import('~/components/tours/TourEditCreateDialog'),
    TourCard: () => import('~/components/tours/TourCard')
  },

  props: {
    travel: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    payload: {},
    tourEntity: null,
    loading: false,
    buttonDisabled: false,
    isSlugEditable: false,
    travelToursKey: 0
  }),

  computed: {
    isEditing() {
      return !this.travel || !!this.travel?.id
    },
    isCreating() {
      return !this.isEditing
    },
    travelEntity() {
      return this.$store.getters['travels/getEntity']
    }
  },

  watch: {
    travel(newValue) {
      if (newValue) {
        this.payload = { ...this.payload, ...newValue }
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
      this.tourEntity = tour === undefined ? undefined : { ...tour }

      this.$refs.tourEditCreateDialog.show()
    },

    handleSubmit(e) {
      e.preventDefault()

      if (this.isEditing) {
        this.update()
      } else {
        this.store()
      }
    },

    async update() {
      const payload = this.payload

      this.buttonDisabled = true
      this.loading = true

      try {
        await this.$store.dispatch('travels/update', payload)

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

    async updateTour(payload) {
      try {
        if (this.isCreating) {
          await this.$store.commit('travels/updateTour', payload)
        } else {
          await this.$store.dispatch('travels/updateTour', payload)
        }

        this.$store.dispatch('ui/showMessage', {
          message: 'Travel modificato con successo'
        })

        this.$refs.tourEditCreateDialog.hide()
      } catch ({ response }) {
        const {
          data: { message }
        } = response

        this.$store.dispatch('ui/showError', { message })
      }
    },

    async store() {
      const payload = {
        ...this.travel,
        ...this.payload
      }

      this.buttonDisabled = true
      this.loading = true
      try {
        await this.$store.dispatch('travels/store', payload)

        this.loading = false
        this.buttonDisabled = false

        this.$store.dispatch('ui/showMessage', {
          message: 'Travel creato con successo'
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

    async storeTour(payload) {
      try {
        // prevent when creating a travel and we dont have an id
        if (this.isCreating) {
          await this.$store.commit('travels/addTour', payload)
        } else {
          await this.$store.dispatch('travels/storeTour', {
            ...payload,
            travelId: this.travel.id
          })
        }

        this.$store.dispatch('ui/showMessage', {
          message: 'Tour creato con successo'
        })

        this.$refs.tourEditCreateDialog.hide()
      } catch (e) {
        console.error(e)
      }
    },

    destroy() {
      console.warn('Not implemented yet, sorry!')
    }
  }
}
</script>
