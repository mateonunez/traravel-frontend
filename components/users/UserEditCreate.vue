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
      <!-- Submit -->
    </form>
  </div>
</template>

<script>
// import cn from 'classnames'
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
    loading: false,
    buttonDisabled: false
  }),

  computed: {
    ...mapGetters(['imAdmin']),

    isEditing() {
      return !this.user || !this.user?.id
    },
    isCreating() {
      return !this.isEditing && !this.isRegistering
    },
    isRegistering() {
      return this.$route.path === '/auth/register'
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
  }
}
</script>
