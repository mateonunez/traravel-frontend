<template>
  <div class="flex flex-col py-8 mt-5">
    <!-- Title  -->
    <div class="flex flex-col py-8 mx-8 sm:mx-auto md:w-1/2">
      <h1 class="text-2xl font-bold leading-none text-slate-800">Users</h1>
    </div>

    <div class="flex flex-row items-center justify-center">
      <!-- Left scroller -->
      <div
        class="mx-2 cursor-pointer"
        @mousedown="scrollingLeft = true"
        @mouseup="scrollingLeft = false"
        @touchstart="scrollingLeft = true"
        @touchend="scrollingLeft = false"
      >
        <ChevronLeft
          class="transition duration-300 ease-in-out transform text-slate-600 hover:text-slate-900 hover:scale-105"
        />
      </div>

      <!-- Content -->
      <div
        ref="userList"
        class="flex flex-row h-full max-w-3xl overflow-x-scroll hide-scroll-bar scroll-smooth"
      >
        <!-- Render users card -->
        <div v-for="user in users" :key="user.id" class="h-full">
          <div class="relative inline-block w-12 h-12 mx-5">
            <img
              class="inline-block object-cover w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
              :alt="user.name"
            />
            <span
              class="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"
            />
          </div>

          <div class="mt-1 text-center">
            <div class="text-xs font-bold text-gray-900">
              {{ initials(user.name) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Right scroller -->
      <div
        class="mx-2 cursor-pointer"
        @mousedown="scrollingRight = true"
        @mouseup="scrollingRight = false"
        @touchstart="scrollingRight = true"
        @touchend="scrollingRight = false"
      >
        <ChevronRight
          class="transition duration-300 ease-in-out transform text-slate-600 hover:text-slate-900 hover:scale-105"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { initials } from '~/lib/helpers/string'
export default {
  name: 'UserScreen',

  components: {
    ChevronRight: () => import('~/components/icons/ChevronRight'),
    ChevronLeft: () => import('~/components/icons/ChevronLeft')
  },

  data: () => ({
    scrollingRight: false,
    scrollingLeft: false,
    timer: null
  }),

  async fetch() {
    await this.$store.dispatch('users/fetch')
  },

  computed: {
    ...mapGetters(['imAdmin']),

    users() {
      return this.$store.getters['users/get']
    }
  },

  watch: {
    scrollingRight(newValue) {
      if (newValue) {
        this.timer = setInterval(() => {
          this.scrollToRight()
        }, 10)
      } else if (!newValue && this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    scrollingLeft(newValue) {
      if (newValue) {
        this.timer = setInterval(() => {
          this.scrollToLeft()
        }, 10)
      } else if (!newValue && this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },

  methods: {
    initials,
    scrollToLeft() {
      this.$refs.userList.scrollLeft -= 10
    },
    scrollToRight() {
      this.$refs.userList.scrollLeft += 10
    }
  }
}
</script>
<style>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
