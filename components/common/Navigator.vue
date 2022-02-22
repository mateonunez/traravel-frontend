<template>
  <div class="relative">
    <button
      class="flex w-8 h-8 border rounded-md shadow-md justify-center items-center"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Navigator'
}
</script>

<style scoped>
button {
  border-color: rgba(151, 151, 151, 0.1);
  background-color: rgba(151, 151, 151, 0.1);
}
</style>
