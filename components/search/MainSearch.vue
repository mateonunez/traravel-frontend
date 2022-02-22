<template>
  <div class="relative my-auto">
    <div
      :class="
        cn(
          'ease-in-out transition-all duration-1000 transform',
          focused ? '-translate-y-14 focused' : 'translate-y-1/2 w-96'
        )
      "
    >
      <!-- Input -->
      <input
        ref="queryRef"
        v-model="query"
        :placeholder="placeholder"
        type="text"
        :class="
          cn(
            'flex self-center w-full h-16 px-12 text-xl transition duration-1000 transform border shadow-lg  focus:outline-none',
            focused ? 'rounded-t-lg' : 'rounded-lg'
          )
        "
      />

      <!-- Search Icon -->
      <div class="absolute top-0 left-0 transform translate-x-2 translate-y-5">
        <SearchIcon v-if="!searching" class="text-slate-400" />
        <Spinner v-else class="text-slate-400" />
      </div>

      <!-- Cross icon -->
      <button
        :class="
          cn(
            'absolute top-0 right-0 w-6 h-6 transition transform -translate-x-3 duration-300 translate-y-5 hover:rotate-180',
            focused ? 'opacity-100' : 'opacity-0'
          )
        "
        @click="resetQuery"
      >
        <Cross class="w-full h-full text-slate-600" />
      </button>

      <!-- Results -->
      <div
        :class="
          cn(
            'w-full bg-white border rounded-b-lg transition transform duration-1000 ease-in-out',
            focused ? 'opacity-100' : 'opacity-0'
          )
        "
      >
        <!-- Results container -->
        <div
          :class="
            cn(
              'flex flex-col my-8 mx-12 transition duration-300 transform opacity-100 ease-in-out',
              searching ? 'opacity-0' : 'opacity-100'
            )
          "
        >
          <!-- Single result -->
          <div
            v-for="travel in results"
            :key="travel.id"
            class="flex flex-row items-center w-full my-2 transition duration-300 ease-linear transform rounded-lg cursor-pointer hover:scale-105 hover:bg-gray-50"
            :title="`${travel.description.substring(0, 140)}...`"
            @click="$router.push(`/travels/${travel.slug}`)"
          >
            <div class="flex flex-col">
              <img
                src="https://via.placeholder.com/100"
                alt="tour.name"
                class="object-cover w-16 h-16 rounded-xl"
              />
            </div>
            <div class="flex flex-col justify-center ml-4">
              <div class="flex flex-row">
                <div class="flex flex-col justify-center">
                  <span class="font-bold">{{ travel.name }}</span>
                </div>
                <div class="flex flex-col"></div>
              </div>
              <div class="flex flex-row items-center">
                <div class="flex flex-col">
                  <span class="text-sm">
                    {{ computeTravelPrice(travel.tours) | currencyForHumans }}
                  </span>
                </div>
                <div class="flex flex-col ml-2">
                  <span class="text-xs text-slate-600">
                    {{ travel.numberOfDays }}☀️ / {{ travel.numberOfNights }}🌑
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cn from 'classnames'
import { currencyForHumans } from '~/lib/filters/currency'

export default {
  name: 'MainSearch',

  filters: {
    currencyForHumans
  },

  components: {
    Spinner: () => import('~/components/ui/Spinner'),
    SearchIcon: () => import('~/components/icons/Search'),
    Cross: () => import('~/components/icons/Cross.vue')
  },

  props: {
    destinations: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    query: null,
    searching: false,
    focused: false,
    placeholder: 'Dove stiamo andando? 🌏'
  }),

  computed: {
    results() {
      return this.$store.getters['travels/getResults']
    }
  },

  watch: {
    query(newQuery) {
      if (newQuery) {
        this.search(newQuery)
      } else if (!newQuery || newQuery.length === 0) {
        this.resetQuery()
      }
    }
  },

  created() {
    setInterval(() => {
      this.animateDestination()
    }, 3000)
  },

  mounted() {
    document.addEventListener('keyup', ({ key }) => {
      if (key === 'Escape') {
        this.resetQuery()
      }
    })
  },

  methods: {
    cn,
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    animateDestination() {
      this.placeholder = this.destinations.length
        ? this.destinations[
            Math.floor(Math.random() * this.destinations.length)
          ].substring(0, 30) + '...'
        : 'Proponi una nuova destinazione ✈️'
    },
    resetQuery() {
      this.focused = false
      this.query = null
      this.searching = false
    },
    computeTravelPrice(tours) {
      return tours.reduce((acc, tour) => acc + tour.price / 100, 0)
    },
    async search() {
      try {
        // real search engine feedback :D
        this.searching = true
        await this.sleep(1000)
        this.focused = true

        await this.$store.dispatch('travels/search', this.query)

        // prevent animation collision
        await this.sleep(1000)
        this.searching = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .focused {
    width: calc(100vw - 3rem);
  }
}

@media only screen and (min-width: 992px) {
  .focused {
    width: calc(100vw - 32rem);
  }
}
</style>
