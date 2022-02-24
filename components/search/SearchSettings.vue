<template>
  <div
    class="flex flex-row items-center justify-around w-full my-2 transform border-0 rounded-lg"
  >
    <div class="flex flex-row">
      <div
        v-for="(entity, index) in Object.values(searcheable)"
        :key="index"
        class="mx-2 cursor-pointer"
      >
        <div
          v-if="!entity.admin || (entity.admin && imAdmin)"
          class="flex flex-col items-center justify-center"
        >
          <button
            class="text-sm font-bold leading-none text-slate-700 hover:text-slate-900"
            @click="handleSearch(entity)"
          >
            {{ entity.label }}
          </button>
          <div
            :class="
              cn(
                'block mt-1 w-1.5 h-1.5 bg-slate-700 rounded-full transition duration-150 ease-in-out',
                entity.id === searcheableEntity.id ? 'opacity-100' : 'opacity-0'
              )
            "
          />
        </div>
      </div>
    </div>

    <!-- Settings button   -->
    <div class="flex flex-col mr-4">
      <button type="button" class="" title="Impostazioni">
        <Cog class="text-slate-700 hover:text-slate-900" />
      </button>
    </div>
  </div>
</template>

<script>
import cn from 'classnames'
import { mapGetters } from 'vuex'
import { searcheableOptions } from '~/lib/config/search'

export default {
  name: 'SearchSettings',

  components: {
    Cog: () => import('~/components/icons/Cog')
  },

  data: () => ({
    searcheableEntity: searcheableOptions.ALL,
    searcheable: searcheableOptions
  }),

  computed: {
    ...mapGetters(['imAdmin'])
  },

  methods: {
    cn,
    resetSearchEntity() {
      this.searcheableEntity = searcheableOptions.ALL
    },
    handleSearch(entity) {
      if (this.searcheableEntity !== entity) {
        this.searcheableEntity = entity
        this.$emit('search', this.searcheableEntity)
      }
    }
  }
}
</script>

<style></style>
