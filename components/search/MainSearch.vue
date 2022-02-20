<template>
  <div class="relative mb-5">
    <label>
      <input
        v-model="query"
        :placeholder="placeholder"
        type="text"
        class="md:w-96 w-full h-16 text-xl pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none shadow-lg"
        @click="handleSearch"
      />
      <SearchIcon
        class="absolute bottom-0 left-0 w-8 h-8 text-slate-400 transform translate-x-2 -translate-y-4"
      />
    </label>
  </div>
</template>
<script>
export default {
  name: 'MainSearch',

  components: {
    SearchIcon: () => import('~/components/icons/Search')
  },

  data: () => ({
    query: null,
    placeholders: [
      'Jordania...',
      'New York...',
      'Tokyo...',
      'Paris...',
      'Roma...',
      'Berlin...',
      'Londra...'
    ],
    placeholder: 'Dove stiamo andando?'
  }),

  created() {
    setInterval(() => {
      this.animateMyTravel()
    }, 3000)
  },

  methods: {
    animateMyTravel() {
      this.placeholder =
        this.placeholders[Math.floor(Math.random() * this.placeholders.length)]
    },
    handleSearch() {
      console.log('searching...')
    }
  }
}
</script>
