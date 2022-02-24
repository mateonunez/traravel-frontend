<template>
  <div>
    <div
      v-for="user in users"
      :key="user.id"
      class="flex flex-row items-center w-full mt-2 mb-4 transition duration-300 ease-linear transform rounded-lg cursor-pointer hover:scale-105 hover:bg-gray-50"
    >
      <div class="flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
          :alt="user.name"
          class="object-cover w-16 h-16 rounded-xl"
        />
      </div>
      <div class="flex flex-col justify-center ml-4">
        <div class="flex flex-row">
          <div class="flex flex-col justify-center">
            <span class="font-bold">{{ user.name }}</span>
          </div>
          <div class="flex flex-col"></div>
        </div>
        <div class="flex flex-row items-center">
          <div class="flex flex-col"></div>
          <div class="flex flex-col ml-2">
            <span class="text-xs text-slate-600">
              {{ user.email }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>
