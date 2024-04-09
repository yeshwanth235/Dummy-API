<template>
  <NavigationDrawer :color="'#AA00FF'"></NavigationDrawer>
  <div class="movies">
    <Loader v-if="pageLoader" :color="'#AA00FF'"></Loader>
    <v-container v-if="!pageLoader">
      <h3>Movies</h3>
      <v-empty-state v-if="!pageByMovies.length" headline="Whoops, 500" title="Sorry, Interal Server!"
          text="Our team is looking into it"
          image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"></v-empty-state>
      <v-row align="center" justify="center">
        <v-col cols="auto" v-for="(item,i) in pageByMovies" :key="item.id">
          <v-card class="mx-auto" max-width="344" color="#AA00FF" variant="elevated">
            <v-img height="200px" width="344" :src="images[i]" cover></v-img>
            <v-card-title>
              {{ item.movie }}
            </v-card-title>
            <v-card-actions>
              <v-btn variant="tonal" color="elevated" :href="item.imdb_url"> Explore </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="!!totalMovies">
        <v-pagination class="mt-5" :length="Math.ceil(totalMovies / 9)" :total-visible="7" color="#AA00FF"
          variant="elevated" v-model="moviesReactive.pageNumber" @click="pageChange">
          <template #prev :disabled="false"></template>
          <template #next :disabled="false"></template>
        </v-pagination>
      </v-row>
      <v-snackbar v-model="responseCallBackBoolean" color="red">{{ responseMsg }}</v-snackbar>
    </v-container>
  </div>
</template>

<script setup>
//imports
import { reactive, ref, onMounted } from 'vue';
import { useDummyStore } from '@/store/dummyStore'
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import Loader from '@/components/Loader.vue';

//stores
const dummyStore = useDummyStore()

// variable
let movies = ref([])
let pageByMovies = ref([])
let totalMovies = ref(0)
let pageNumber = ref(0)
let pageLoader = ref(false)
let responseMsg = ref('')
let responseCallBackBoolean = ref(false)
let imageLink = 'https://c4.wallpaperflare.com/wallpaper/834/145/210/movie-the-shawshank-redemption-clancy-brown-wallpaper-preview.jpg'
let moviesReactive = reactive({ movies, pageByMovies, totalMovies, pageNumber, pageLoader, responseMsg, responseCallBackBoolean })
let images = [
  'https://c4.wallpaperflare.com/wallpaper/834/145/210/movie-the-shawshank-redemption-clancy-brown-wallpaper-preview.jpg',
  'https://pbs.twimg.com/media/FMc90ZrX0AMJ1_h?format=jpg&name=medium',
  'https://m.media-amazon.com/images/M/MV5BMjE3NTU0NTQ5NF5BMl5BanBnXkFtZTcwNzczMTk2Mw@@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMTk1ODY0NDg2M15BMl5BanBnXkFtZTcwNTU2MTk2Mw@@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BZjExZjM3MTktYzcxMC00YTY1LTgyYzktNTM3YzJhMDU1OGQxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMjk3NTYyMzc4Nl5BMl5BanBnXkFtZTcwODU3ODMzMw@@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMjQ4NDg5MTQwNl5BMl5BanBnXkFtZTgwNTQwMTk2MTI@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNjhlOWFmMmMtOGI5NC00NWJkLWE4OTUtMzA5NzE1MGZmYjM5XkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg'
]
// life cycles
onMounted(() => {
  moviesReactive.pageLoader = true
  dummyStore.getDummyData('movies', dummySuccess, dummyFailure)
})

// methods
const dummySuccess = (response) => {
  moviesReactive.movies = response
  moviesReactive.totalMovies = response.length
  setTimeout(() => {
    moviesReactive.pageLoader = false
  }, 2000)
  moviesReactive.pageByMovies = moviesReactive.movies.slice(0, 9)
}

const dummyFailure = (response) => {
  moviesReactive.pageLoader = false
  moviesReactive.responseCallBackBoolean = true
  moviesReactive.responseMsg = 'Internal Server Error'
  setTimeout(() => {
    moviesReactive.responseCallBackBoolean = false
    moviesReactive.responseMsg = ''
  }, 2000)
}

const pageChange = () => {
  let pageNumber = moviesReactive.pageNumber
  moviesReactive.pageByMovies = moviesReactive.movies.slice((pageNumber - 1) * 9, pageNumber * 9)
}

</script>

<style scoped lang="scss">
.movies {
  font-family: "Roboto Slab", serif;

  h3 {
    text-align: center;
    color: #AA00FF;
    font-size: 35px;
    padding: 10px 0;
  }

  &__loader {
    height: 100vh;
    width: inherit;
    display: flex;
    place-items: center;
  }
}
</style>