<template>
  <!-- Reused on /auth/register -->
  <div class="flex flex-col justify-center max-w-2xl mx-8">
    <form class="flex flex-col mt-8" @submit="handleSubmit">
      <!-- Name -->
      <div class="relative mb-5">
        <span class="font-bold">Nome</span>
        <label>
          <input
            v-model="payload.name"
            type="text"
            placeholder="Inserisci il nome"
            class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg appearance-none text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </label>

        <UserIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>

      <!-- Email -->
      <div class="relative mb-5">
        <span class="font-bold">Email</span>
        <label>
          <input
            v-model="payload.email"
            type="email"
            placeholder="Inserisci l'email"
            class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </label>
        <MailIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 text-gray-500 transform translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <!-- Role, only if admin -->

      <!-- Password -->
      <div class="relative mb-5">
        <span class="font-bold">Password</span>
        <label>
          <input
            v-model="payload.password"
            type="password"
            placeholder="Inserisci la password"
            class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </label>
        <LockClosedIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 text-gray-500 transform translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <!-- Confirm Password -->
      <div v-if="!isEditing" class="relative mb-5">
        <span class="font-bold">Conferma Password</span>
        <label>
          <input
            v-model="payload.confirmPassword"
            type="password"
            placeholder="Conferma la password"
            class="w-full py-2 pl-12 pr-2 transition ease-in-out border border-solid rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </label>
        <LockClosedIcon
          class="absolute bottom-0 left-0 w-6 h-6 -mb-1 text-gray-500 transform translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <!-- Role -->
      <div v-if="!isRegistering">Hello</div>

      <!-- Submit -->
      <div class="flex flex-row items-center justify-center my-5">
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
            {{ buttonLabel }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import cn from 'classnames'
import { mapGetters } from 'vuex'

export default {
  name: 'UserEditCreate',

  components: {
    UserIcon: () => import('~/components/icons/User'),
    MailIcon: () => import('~/components/icons/Mail'),
    LockClosedIcon: () => import('~/components/icons/LockClosed')
  },

  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    payload: {},
    loading: false
  }),

  computed: {
    ...mapGetters(['imAdmin']),

    isCreating() {
      return !this.isEditing && !this.isRegistering
    },
    isRegistering() {
      return this.$route.path === '/auth/register'
    },
    isEditing() {
      return (this.user && this.user?.id && !this.isRegistering) || false
    },
    validEmail() {
      return (
        (this.isEditing && !this.payload.email) ||
        this.payload.email === null || // prevent error at first render
        (this.payload.email?.length > 0 &&
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.payload.email))
      )
    },
    passwordsAreValid() {
      return (
        this.payload.password === null ||
        (this.payload.password?.length > 3 &&
          this.payload.password === this.payload.confirmPassword)
      )
    },
    buttonDisabled() {
      return this.loading || !this.validEmail || !this.passwordsAreValid
    },
    buttonLabel() {
      return this.isEditing
        ? 'Effettua le modifiche'
        : this.isCreating
        ? 'Crea nuovo utente'
        : this.isRegistering
        ? 'Effettua la registrazione'
        : ''
    }
  },

  watch: {
    user(newValue) {
      if (newValue) {
        this.payload = { ...this.user, ...newValue }
      }
    }
  },

  mounted() {
    if (this.user) {
      this.payload = { ...this.user }
    }
  },

  methods: {
    cn,

    async handleSubmit(e) {
      e.preventDefault()

      await Promise.resolve(true)
    }
  }
}
</script>
