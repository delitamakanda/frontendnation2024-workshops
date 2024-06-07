---
type: lesson
title: createStorage
focus: /src/App.vue
template: vueuse
terminal:
    panels:
        - ['terminal', { name: 'Dev Server', id: 'dev' }]
        - ['terminal', { name: 'Command Line', id: 'cmds'}]
    activePanel: 1
---

# createGlobalState

Keep states in the global scope to be reusable across Vue instances.

## Usage

### Without Persistence (Store in Memory)

```js store.js
import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

const useState = createGlobalState(() => useStorage('vue-use-local-storage', {
  name: 'banana',
  color: 'yellow',
  size: 'medium',
  count: 0,
}))

```

A bigger example

```js store.js
import { ref, computed } from 'vue'
import { useStorage, useMouse, createGlobalState } from '@vueuse/core'

const useState = createGlobalState(() => useStorage('vue-use-local-storage', {
  name: 'banana',
  color: 'yellow',
  size: 'medium',
  count: 0,
}))

```
