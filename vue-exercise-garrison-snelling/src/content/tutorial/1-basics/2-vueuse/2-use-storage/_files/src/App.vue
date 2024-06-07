<script setup>
import { useStorage, useMouse, createGlobalState } from '@vueuse/core'

const useState = createGlobalState(() => useStorage('vue-use-local-storage', {
  name: 'banana',
  color: 'yellow',
  size: 'medium',
  count: 0,
}))

const state = useState()

const text = JSON.stringify(state)
const { x, y } = useMouse()
</script>

<template>
  <div>
   <input v-model="state.name" type="text" />
   <input v-model="state.color" type="text" />
   <input v-model="state.size" type="text" />
   <input v-model.number="state.count" type="range" min="0" step="0.01" max="1000" />

   <pre lang="yaml">{{ text }}</pre>
   <div>x: {{ x }}, y: {{ y }}</div>
  </div>
</template>

<style scoped>
</style>
