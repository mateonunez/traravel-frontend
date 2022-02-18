<template>
  <div class="flex flex-col justify-center max-w-2xl py-20 mx-8 sm:mx-auto fit">
    <!-- Welcome messages -->
    <div class="flex flex-col">
      <h1 class="text-3xl">Bentornato!</h1>
      <span className="-mt-4 text-sm">Effettua l'accesso per proseguire!</span>
    </div>

    <!-- Login form -->
    <div class="flex flex-col mt-10">
      <!-- Email input -->
      <div class="relative mb-5">
        <span class="font-bold">Email</span>
        <label>
          <input
            type="email"
            :class="
              cn(
                'w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none',
                !validEmail ? 'border-red-500' : 'border-gray-300 '
              )
            "
          />
        </label>
        <MailIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 text-gray-500 transform translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <!-- Password input -->
      <div class="relative">
        <span class="font-bold">Password</span>
        <label>
          <input
            type="password"
            :class="
              cn(
                'w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none',
                !validEmail ? 'border-red-500' : 'border-gray-300 '
              )
            "
          />
        </label>
        <LockClosedIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 text-gray-500 transform translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <!-- Lost Password -->
      <div class="flex flex-row justify-end mt-1 mb-8">
        <button>
          <span class="text-sm text-teal-600 cursor-pointer">
            Dimenticato la Password?
          </span>
        </button>
      </div>

      <!-- Submit button -->
      <div class="flex flex-row mt-auto">
        <button
          type="submit"
          class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-lg"
        >
          Accedi
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import cn from 'classnames'

export default {
  name: 'Login',

  components: {
    MailIcon: () => import('@/components/icons/Mail.vue'),
    LockClosedIcon: () => import('@/components/icons/LockClosed.vue')
  },

  data: () => ({
    validEmail: true
  }),

  methods: {
    cn
  }
}
</script>
