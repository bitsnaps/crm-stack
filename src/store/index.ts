import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const id = ref(0)
  function increment() {
    id.value++
  }

  return { id, increment }
})
