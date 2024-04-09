<template>
  <v-layout>
    <v-navigation-drawer rail expand-on-hover class="nav-bar" :style="`--background-color: ${props.color}`" rail-width="62">
      <v-list-item title="Dummy API" :height="80" class="list"
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav class="list">
        <v-list-item :prepend-icon="mdiFolder" :height="60" title="Home" @click="onClick('')" class="list"></v-list-item>
        <v-list-item :prepend-icon="mdiFolder" :height="60" title="Products" @click="onClick('product')" class="list"></v-list-item>
        <v-list-item :prepend-icon="mdiFolder" :height="60" title="Pokemon" @click="onClick('pokemon')" class="list"></v-list-item>
        <v-list-item :prepend-icon="mdiFolder" :height="60" title="Movies" @click="onClick('movies')" class="list"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>

</template>

<script setup>
// imports
import router from '@/router'
import { mdiFolder } from '@mdi/js'

// variables
const props = defineProps(['color'])


const onClick = (value) => {
  router.push(`/dummy-api/${value}`)
}

</script>

<style scoped lang="scss">

.nav-bar {
  color: #fff;
  background: #3f51b5;
  background: var(--background-color);
}

.list {
  color: #fff;
  font-size: 18px;
  ::v-deep .v-list-item-title {
    font-size: 18px !important;
  }
  ::v-deep .v-list-item-subtitle {
    margin-top: 6px;
  }
}
</style>