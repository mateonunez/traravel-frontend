<template>
  <div>
    <div
      v-for="user in users"
      :key="user.id"
      class="flex flex-col items-center w-full mt-2 mb-4 transition duration-300 ease-linear transform rounded-lg cursor-pointer md:flex-row hover:scale-105 hover:bg-gray-50"
    >
      <!-- Image -->
      <div class="flex flex-col my-1 sm:flex-row lg:items-end">
        <img
          src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          :alt="user.name"
          class="object-cover w-16 h-16 rounded-xl"
        />
      </div>

      <!-- Name -->
      <div
        class="flex flex-col items-center my-1 text-center md:items-baseline md:ml-4"
      >
        <span class="font-bold">{{ user.name }}</span>
        <span class="text-xs text-slate-600">
          {{ user.email }}
        </span>
      </div>

      <!-- Role -->
      <div
        v-if="imEditor"
        class="flex flex-col items-center justify-center mx-auto my:1 md:ml-auto md:mr-2"
      >
        <div
          class="flex justify-center items-center px-1 py-1 text-xs font-bold text-red-700 uppercase bg-red-200 rounded-full text-[7px] leading-sm w-20 text-center"
        >
          <span v-if="user.roles.length">
            {{ user.roles[0].name }}
          </span>

          <!-- This sounds like a Pokemon name -->
          <span v-else>Traraveler</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currencyForHumans } from '~/lib/filters/currency'

export default {
  name: 'UsersResults',

  filters: {
    currencyForHumans
  },

  props: {
    users: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapGetters(['imEditor'])
  }
}
</script>
