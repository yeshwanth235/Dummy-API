<template>
  <NavigationDrawer :color="'#3f51b5'"></NavigationDrawer>
  <div class="pokemon">
    <Loader v-if="pageLoader" :color="'#3f51b5'"></Loader>
    <v-container v-if="!pageLoader">
      <h3>Pokemon</h3>
      <v-empty-state v-if="!pageByPokemons.length" headline="Whoops, 500" title="Sorry, Interal Server!"
          text="Our team is looking into it"
          image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"></v-empty-state>
      <v-row align="center" justify="center">
        <v-col cols="5" v-for="item in pageByPokemons" :key="item.id">
          <v-card
            color="#3f51b5"
            theme="dark"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  {{ item.pokemon }}
                </v-card-title>
                <v-card-subtitle>Location: {{ item.location }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    class="ms-2"
                    size="small"
                    variant="outlined"
                  >
                    START RADIO
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar
                class="ma-3"
                rounded="0"
                size="125"
              >
                <v-img :src="item.image_url"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="!!totalPokemons">
        <v-pagination class="mt-2" :length="Math.ceil(totalPokemons / 8)" :total-visible="7" color="indigo"
          variant="elevated" v-model="pokemonReactive.pageNumber" @click="pageChange">
          <template #prev :disabled="false"></template>
          <template #next :disabled="false"></template>
        </v-pagination>
      </v-row>
      <v-snackbar v-model="responseCallBackBoolean" color="red">{{ responseMsg }}</v-snackbar>
    </v-container>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useDummyStore } from '@/store/dummyStore'
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import Loader from '@/components/Loader.vue';

// variable
const dummyStore = useDummyStore()
let pokemons = ref([])
let pageByPokemons = ref([])
let totalPokemons = ref(0)
let pageNumber = ref(0)
let pageLoader = ref(false)
let responseMsg = ref('')
let responseCallBackBoolean = ref(false)


let pokemonReactive = reactive({ pokemons, pageByPokemons, totalPokemons, pageNumber, pageLoader, responseMsg, responseCallBackBoolean})

// life cycles
onMounted(() => {
  pokemonReactive.pageLoader = true
  dummyStore.getDummyData('pokemon', dummySuccess, dummyFailure)
})

// methods
const dummySuccess = (response) => {
  pokemonReactive.pokemons = response
  pokemonReactive.totalPokemons = response.length
  setTimeout(() => {
    pokemonReactive.pageLoader = false
  }, 2000)
  pokemonReactive.pageByPokemons = pokemonReactive.pokemons.slice(0, 8)
}

const dummyFailure = (response) => {
  pokemonReactive.pageLoader = false
  productReactive.responseCallBackBoolean = true
  pokemonReactive.responseMsg = 'Internal Server Error'
  setTimeout(() => {
    pokemonReactive.responseCallBackBoolean = false
    pokemonReactive.responseMsg = ''
  }, 2000)
}

const pageChange = () => {
  let pageNumber = pokemonReactive.pageNumber
  pokemonReactive.pageByPokemons = pokemonReactive.pokemons.slice((pageNumber - 1) * 8, pageNumber * 8)
}
</script>

<style scoped lang="scss">
.pokemon {
  font-family: "Roboto Slab", serif;

  h3 {
    text-align: center;
    color: #3f51b5;
    font-size: 35px;
    padding: 10px 0;
    padding-top: 0;
  }

  &__loader {
    height: 100vh;
    width: inherit;
    display: flex;
    place-items: center;
  }

}
</style>