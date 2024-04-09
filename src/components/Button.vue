<template>
  <div> 
    <button @click="onClick">
      <slot name="buttonName"></slot>
      <slot name="buttonSecond"></slot>
      {{ propData }}
    </button>
    <p>{{ number }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const props = defineProps(['propData'])
  const emit = defineEmits(['buttonClick'])
  const number = ref(0)
  const onClick = () => {
    emit('buttonClick')
  }
</script>
