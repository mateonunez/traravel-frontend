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
  </div>
</template>

<script>
export default {
  name: 'NavigatorBar',

  components: {
    Navigator: () => import('~/components/common/Navigator'),
    ArrowLeft: () => import('~/components/icons/ArrowLeft'),
    Cross: () => import('~/components/icons/Cross')
  }
}
</script>
