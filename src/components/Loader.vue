<template>
  <v-container class="h-screen d-flex justify-center align-center">
    <v-progress-circular model-value="20" :size="88" :width="5"
      indeterminate :color="`${props.color}`"></v-progress-circular>
  </v-container>
</template>

<script setup>
  const props = defineProps(['color'])
</script>