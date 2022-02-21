<template>
  <div class="relative mb-5">
    <label>
      <input
        ref="queryRef"
        v-model="query"
        :placeholder="placeholder"
        type="text"
        class="w-full h-16 px-12 text-xl transition ease-in-out border border-solid rounded-lg shadow-lg md:w-96 focus:border-blue-500 focus:outline-none"
        @click="handleSearch"
      />
      <SearchIcon
        class="absolute bottom-0 left-0 w-8 h-8 transform translate-x-2 -translate-y-5 text-slate-400"
      />
      <button
        :class="
          cn(
            'absolute bottom-0 right-0 w-6 h-6 transition transform -translate-x-3 duration-300 -translate-y-5 hover:rotate-180',
            query ? 'opacity-100' : 'opacity-0'
          )
        "
        @click="resetQuery"
      >
        <Cross class="w-full h-full text-slate-600" />
      </button>
    </label>
  </div>
</template>
<script>
import cn from 'classnames'

export default {
  name: 'MainSearch',

  components: {
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
    placeholder: 'Dove stiamo andando? 🌏'
  }),

  created() {
    setInterval(() => {
      this.animateDestination()
    }, 3000)

    console.log(this.destinations)
  },

  methods: {
    cn,
    animateDestination() {
      this.placeholder = this.destinations.length
        ? this.destinations[
            Math.floor(Math.random() * this.destinations.length)
          ].substring(0, 30) + '...'
        : 'Proponi una nuova destinazione ✈️'
    },
    handleSearch() {
      console.log('searching...')
    },
    resetQuery() {
      this.query = null
      this.$refs.queryRef?.focus()
    }
  }
}
</script>
