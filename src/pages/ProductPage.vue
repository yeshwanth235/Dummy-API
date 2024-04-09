<template>
  <NavigationDrawer :color="'#1E88E5'"></NavigationDrawer>
  <v-app>
    <div class="product">
      <Loader v-if="pageLoader" :color="'#1E88E5'"></Loader>
      <!-- <v-container class="h-screen d-flex justify-center align-center" v-if="pageLoader">
      <v-progress-circular model-value="20"  color="red" :size="88" :width="5"
        indeterminate></v-progress-circular>
    </v-container> -->
      <v-container v-if="!pageLoader">
        <h3>Products</h3>
        <v-empty-state v-if="!pageByProducts.length" headline="Whoops, 500" title="Sorry, Interal Server!"
          text="Our team is looking into it"
          image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"></v-empty-state>
        <v-row align="center" justify="center">
          <v-col cols="5" v-for="item in pageByProducts" :key="item.id">
            <!-- {{ item }} -->
            <v-card color="#1E88E5" theme="dark">
              <div class="d-flex flex-no-wrap flex-column justify-space-between">
                <v-img :src="item.thumbnailImage"></v-img>
                <v-card-item>
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-subtitle>
                    <span class="me-1">Price: {{ item.basePrice }}</span>
                  </v-card-subtitle>
                </v-card-item>
                <v-card-text>
                  <div>{{ item.description }}</div>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" v-if="!!totalProducts">
          <v-pagination class="mt-2" :length="Math.ceil(totalProducts / 8)" :total-visible="7" color="#1E88E5"
            variant="elevated" v-model="productReactive.pageNumber" @click="pageChange">
            <template #prev :disabled="false"></template>
            <template #next :disabled="false"></template>
          </v-pagination>
        </v-row>
        <v-snackbar v-model="responseCallBackBoolean" color="red">{{ responseMsg }}</v-snackbar>
      </v-container>
    </div>
  </v-app>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useDummyStore } from '@/store/dummyStore'
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import Loader from '@/components/Loader.vue';

// variable
const dummyStore = useDummyStore()
let products = ref([])
let pageByProducts = ref([])
let totalProducts = ref(0)
let pageNumber = ref(0)
let pageLoader = ref(false)
let responseMsg = ref('')
let responseCallBackBoolean = ref(false)

let productReactive = reactive({ products, pageByProducts, totalProducts, pageNumber, pageLoader, responseMsg, responseCallBackBoolean })

// life cycles
onMounted(() => {
  productReactive.pageLoader = true
  dummyStore.getDummyData('products', dummySuccess, dummyFailure)
})

// methods
const dummySuccess = (response) => {
  console.log('dummySuccess: ', response)
  productReactive.products = response
  productReactive.totalProducts = response.length
  setTimeout(() => {
    productReactive.pageLoader = false
  }, 2000)
  productReactive.pageByProducts = productReactive.products.slice(0, 8)
}

const dummyFailure = (response) => {
  productReactive.pageLoader = false
  productReactive.responseCallBackBoolean = true
  productReactive.responseMsg = 'Internal Server Error'
  setTimeout(() => {
    productReactive.responseMsg = ''
    productReactive.responseCallBackBoolean = false
  }, 2000)
}

const pageChange = () => {
  let pageNumber = productReactive.pageNumber
  productReactive.pageByProducts = productReactive.products.slice((pageNumber - 1) * 8, pageNumber * 8)
}
</script>

<style scoped lang="scss">
.product {
  font-family: "Roboto Slab", serif;

  h3 {
    text-align: center;
    color: #1E88E5;
    font-size: 35px;
    padding: 10px 0;
    padding-top: 0;
  }
}
</style>