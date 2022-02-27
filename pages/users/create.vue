<template>
  <div class="flex flex-col w-full h-full sm:mx-auto">
    <!-- Navigators -->
    <div class="flex flex-row justify-between mt-7 mx-7">
      <!-- Left Navigator -->
      <Navigator @click="$router.go(-1)">
        <ArrowLeft
          class="w-8 h-8 transition duration-300 transform text-slate-800 hover:scale-110"
        />
      </Navigator>

      <!-- Cross Navigator -->
      <Navigator @click="$router.push('/')">
        <Cross
          class="w-8 h-8 transition duration-300 transform text-slate-800 hover:rotate-90"
        />
      </Navigator>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full px-4 py-8 mx-auto mt-20 md:w-1/2">
      <!-- Title -->
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col w-2/3">
          <h1 class="text-2xl font-bold leading-none text-slate-800">
            Crea Nuovo Utente
          </h1>
        </div>
      </div>
    </div>

    <!-- Travel Edit Create -->
    <div class="flex flex-col w-full sm:mx-auto">Coming soon...</div>
  </div>
</template>

<script>
export default {
  name: 'UserCreatePage',

  components: {
    Navigator: () => import('~/components/common/Navigator'),
    ArrowLeft: () => import('~/components/icons/ArrowLeft'),
    Cross: () => import('~/components/icons/Cross')
  },

  middleware: ['auth', 'admin']
}
</script>
