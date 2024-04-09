<template>
  <NavigationDrawer :color="'#00BCD4'"></NavigationDrawer>
  <Loader v-if="pageLoader" :color="'#00BCD4'"></Loader>
  <v-container v-if="!pageLoader">
    <div class="home-page d-flex justify-center flex-column align-center">
      <h1 class="mb-5">HomePage</h1>
      <p class="w-75 mb-5 text-center">
        This project was developed using a combination of technologies to deliver a user-friendly experience.
        The backend utilized a Dummy API to simulate real-world data interactions, while the frontend was built with
        Vue.js 3
        for a performant and flexible framework. Pinia served as the state management solution, ensuring data
        consistency across the application. Finally, Vuetify provided a comprehensive library of UI
        components to deliver a visually appealing and interactive interface.
      </p>
      <h3 class="mb-5">Check Below Pages</h3>
      <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background class="rounded-lg">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <div class="d-flex fill-height justify-center align-center" @click="onClick(i)">
              <div class="text-h2">
                <v-icon :icon="icons[i]" />
                {{ slide }} Page
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <p class="mt-3">
        <v-icon :icon="mdiArrowUpBold" class="icon" />
      </p>
      <h3 class="click rounded-lg">
        Click It
      </h3>
    </div>
  </v-container>

</template>

<script setup>
// imports
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import router from '@/router'
import Loader from '@/components/Loader.vue';
import { mdiMovie, mdiCrown, mdiCircleMultiple, mdiArrowUpBold } from '@mdi/js'
import { onMounted, reactive, ref } from 'vue';

let pageLoader = ref(true)
const colors = ['#1E88E5', '#3f51b5', '#AA00FF']
const slides = ['Products', 'Pokemon', 'Movies']
const icons = [mdiCircleMultiple, mdiCrown, mdiMovie]
let homeReactive = reactive({ pageLoader })


onMounted(() => {
  setTimeout(() => {
    homeReactive.pageLoader = false
  }, 2000)
})

const onClick = (value) => {
  console.log(value)
  if(value===0) {
    router.push('/product')
  }
  if(value===1) {
    router.push('/pokemon')
  }
  if(value==2) {
    router.push('/movie')
  }
}

</script>

<style scoped lang="scss">
.home-page {
  color: #00BCD4;
  h1 {
    text-align: center;
  }
}
.icon {
  color: #00BCD4;
}
// .click {
//   background: #00BCD4;
//   width: 100px;
//   color: #fff;
// }
</style>