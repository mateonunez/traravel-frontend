<template>
  <div class="relative my-auto">
    <div
      :class="
        cn(
          'ease-in transition-all duration-1000 transform ',
          focused ? '-translate-y-24 w-fit' : 'translate-y-[12rem] w-72'
        )
      "
      :style="cn(focused ? 'width: calc(100vw - 20rem)' : 'width: 24rem')"
    >
      <div>
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
          @focus="focused = true"
        />

        <!-- Search Icon -->
        <SearchIcon
          class="absolute top-0 left-0 w-8 h-8 transform translate-x-2 translate-y-5 text-slate-400"
        />

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

      <div
        :class="
          cn(
            'w-full bg-white border rounded-b-lg transition transform duration-1000 ease-in-out h-96',
            focused ? 'opacity-100' : 'opacity-0'
          )
        "
      />
    </div>
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
    focused: false,
    placeholder: 'Dove stiamo andando? 🌏'
  }),

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
    animateDestination() {
      this.placeholder = this.destinations.length
        ? this.destinations[
            Math.floor(Math.random() * this.destinations.length)
          ].substring(0, 30) + '...'
        : 'Proponi una nuova destinazione ✈️'
    },
    resetQuery() {
      this.focused = !this.focused
      this.query = null
    }
  }
}
</script>
