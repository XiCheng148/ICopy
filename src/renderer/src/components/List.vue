<script setup lang="ts">
// import { ipcRenderer } from 'electron'
import { getAllItem } from '@renderer/api/getAllitem'
import { onMounted, ref } from 'vue'
// import imageSvg from '@renderer/assets/image.svg'
const list = ref<Array<any>>([])

onMounted(async () => {
  list.value = await getAllItem()
})

window.electron.ipcRenderer.on('clipboard-changed', async () => {
  const res = await getAllItem()
  list.value = [...res]
  console.log('list.value: ', list.value)
})
</script>
<template>
  <div v-if="list.length > 0" class="overflow-y-auto h-100vh scrollbar-custom py-32px">
    <div
      v-for="(item, idx) in list"
      :key="idx"
      :class="[
        'h-100px mx-2 p-2 rounded-xl mb-4',
        'shadow-lg ring-1 ring-inset ring-white/10',
        'flex justify-between items-center',
        'hover:-translate-y-2 hover:bg-[#0078d4]',
        'transition-all duration-300 ease-in',
        'select-text overflow-hidden',
        idx % 2 === 0 ? 'bg-[#1E293B88]' : 'bg-[#1E293B]'
      ]"
    >
      <span>{{ item.content }}</span>
      <!-- <img v-else class="h-100px w-100px" :src="item.data" alt="" srcset="" /> -->
    </div>
  </div>
</template>
