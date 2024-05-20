<script setup lang="ts">
// import { ipcRenderer } from 'electron'
import { getAllItem } from '@renderer/api/getAllitem'
import { onMounted, ref } from 'vue'
const list = ref<Array<any>>([])

onMounted(async () => {
  list.value = await getAllItem()
})

window.electron.ipcRenderer.on('clipboard-changed', async () => {
  const res = await getAllItem()
  list.value = [...res]
  console.log('list.value: ', list.value)
})
const copy = () => {
  console.log('copy')
}
</script>
<template>
  <!-- <button type="button" @click="showBar">Show Bar</button> -->
  <div v-if="list.length > 0" class="flex flex-col gap-2 overflow-y-auto h-100vh scrollbar-custom">
    <div
      v-for="(item, idx) in list"
      :key="idx"
      :class="[
        'bg-[#1E293B]',
        'h-100px',
        'rounded-xl',
        'shadow-lg',
        'ring-1 ',
        'ring-inset',
        'ring-white/10',
        'mx-2',
        'p-2',
        'flex',
        'justify-between',
        'items-center',
        'select-text'
      ]"
    >
      <span>{{ item.content }}</span>
      <!-- <img v-else class="h-100px w-100px" :src="item.data" alt="" srcset="" /> -->
      <!-- <button type="button" @click="copy">copy</button> -->
    </div>
  </div>
</template>
