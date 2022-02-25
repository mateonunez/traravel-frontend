<template>
  <div class="relative my-auto">
    <div
      :class="
        cn(
          'ease-in-out transition-all duration-1000 transform',
          focused
            ? 'md:-translate-y-6 translate-y-4 focused'
            : 'translate-y-1/2 md:w-96 w-72'
        )
      "
    >
      <!-- Input -->
      <div ref="mainInput">
        <input
          ref="queryRef"
          v-model="query"
          :placeholder="placeholder"
          type="text"
          :class="
            cn(
              'flex self-center w-full h-16 px-12 text-xl transition duration-1000 transform shadow-xl focus:outline-none -mt-16',
              focused ? 'rounded-t-lg border-x border-t' : ' rounded-lg'
            )
          "
        />

        <!-- Search Icon -->
        <div
          class="absolute top-0 left-0 transform translate-x-2 translate-y-5"
        >
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
      </div>

      <!-- Results -->
      <div
        :class="
          cn(
            'w-full bg-white border rounded-b-lg transition transform duration-1000 ease-in-out',
            focused ? 'opacity-100 border-t-0' : 'opacity-0'
          )
        "
      >
        <!-- Results container -->
        <div
          :class="
            cn(
              'flex flex-col transition duration-300 transform opacity-100 ease-in-out',
              searching ? 'opacity-0' : 'opacity-100'
            )
          "
        >
          <!-- Settings -->
          <SearchSettings ref="searchSettings" @search="handleSearch" />

          <!-- No results -->
          <div
            v-if="!searchResults && !searching"
            class="flex flex-row items-center justify-around w-full mb-2 transform rounded-lg"
          >
            <span class="font-bold text-center">Nessun rislutato</span>
          </div>

          <!-- Single travel result -->
          <div
            class="px-12 mt-8 overflow-x-hidden overflow-y-scroll md:max-h-96 max-h-64"
          >
            <TravelsResults :travels="travelsResults" />
            <ToursResults :tours="toursResults" />
            <UsersResults :users="usersResults" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cn from 'classnames'
import { mapGetters } from 'vuex'
import { currencyForHumans } from '~/lib/filters/currency'
import { searcheableOptions } from '~/lib/config/search'

export default {
  name: 'MainSearch',

  filters: {
    currencyForHumans
  },

  components: {
    Spinner: () => import('~/components/ui/Spinner'),
    SearchIcon: () => import('~/components/icons/Search'),
    Cross: () => import('~/components/icons/Cross'),
    SearchSettings: () => import('~/components/search/SearchSettings'),
    TravelsResults: () => import('~/components/search/TravelsResults'),
    ToursResults: () => import('~/components/search/ToursResults'),
    UsersResults: () => import('~/components/search/UsersResults')
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
    ...mapGetters(['imAdmin']),

    results() {
      return this.$store.getters['search/get']
    },

    searchResults() {
      return (
        this.results?.travels?.length > 0 ||
        this.results?.tours?.length > 0 ||
        this.results?.users?.length > 0
      )
    },

    travelsResults() {
      return this.results?.travels || []
    },
    toursResults() {
      return this.results?.tours || []
    },
    usersResults() {
      return this.results?.users || []
    }
  },

  watch: {
    query(newQuery) {
      if (newQuery && !this.searching) {
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
      this.searching = false
      this.focused = false
      this.query = null

      this.$refs.searchSettings.resetSearchEntity()
    },

    computeTravelPrice(tours) {
      return tours.reduce((acc, tour) => acc + tour.price, 0)
    },

    async search(searcheableEntity) {
      try {
        this.searching = true
        await this.sleep(500)
        this.focused = true

        await this.$store.dispatch('search/search', {
          q: this.query,
          ...(searcheableEntity !== searcheableOptions.ALL && {
            type: searcheableEntity.value
          })
        })

        await this.sleep(500)
        this.searching = false
      } catch (e) {
        console.error(e)
      }
    },

    handleSearch(searcheableEntity) {
      this.search(searcheableEntity)
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

@media only screen and (min-width: 768px) {
  .focused {
    width: calc(100vw - 20rem);
  }
}

@media only screen and (min-with: 1920px) {
  .focused {
    width: calc(100vw - 30rem);
  }
}
</style>
