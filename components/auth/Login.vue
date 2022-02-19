<template>
  <div class="flex flex-col justify-center max-w-2xl py-20 mx-8 sm:mx-auto fit">
    <!-- Welcome messages -->
    <div class="flex flex-col max-w-md">
      <h1 class="font-bold text-5xl">Bentornato!</h1>
      <span className="-mt-1 text-xs">
        Non perderti nessuna delle nostre avventure. Fai subito il check-in...
        login!
      </span>
    </div>

    <!-- Login form -->
    <form class="flex flex-col mt-8" @submit="handleLogin">
      <!-- Email input -->
      <div class="relative mb-5">
        <span class="font-bold">Email</span>
        <label>
          <input
            v-model="email"
            type="email"
            placeholder="Inserisci la tua email"
            :class="
              cn(
                'w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none',
                !validEmail && 'border-red-500'
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
            v-model="password"
            type="password"
            placeholder="Inserisci la tua password"
            :class="
              cn(
                'w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none',
                !validPassword && 'border-red-500'
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
        <button class="cursor-pointer">
          <span class="text-sm text-orange-600 hover:text-orange-800">
            Dimenticato la Password?
          </span>
        </button>
      </div>

      <!-- Submit button -->
      <div class="flex flex-row mt-auto justify-center items-center">
        <button
          :disabled="buttonDisabled"
          type="submit"
          :class="
            cn(
              'w-full px-4 py-2 font-bold rounded-lg flex justify-center',
              buttonDisabled ? 'bg-slate-300' : 'bg-red-500 hover:bg-red-700'
            )
          "
        >
          <Spinner v-if="loading" class="text-red-700" color="pink-500" />
          <span
            v-else
            :class="buttonDisabled ? 'text-red-700' : 'text-gray-200'"
          >
            Accedi
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import cn from 'classnames'

export default {
  name: 'Login',

  components: {
    MailIcon: () => import('@/components/icons/Mail.vue'),
    LockClosedIcon: () => import('@/components/icons/LockClosed.vue'),
    Spinner: () => import('@/components/common/Spinner.vue')
  },

  data: () => ({
    email: null,
    password: null,
    loading: false
  }),

  computed: {
    validEmail() {
      return (
        this.email === null || // prevent error at first render
        (this.email?.length > 0 &&
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.email))
      )
    },
    validPassword() {
      return (
        this.password === null || // prevent error at first render
        (this.password?.length > 0 &&
          /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(this.password))
      )
    },
    buttonDisabled() {
      return !this.validEmail || !this.validPassword || this.loading
    }
  },

  methods: {
    cn,
    handleLogin(e) {
      e.preventDefault()

      this.loading = true
      setTimeout(() => {
        this.loading = false
        console.log(this.email, this.password)
      }, 1000)
    }
  }
}
</script>
