import { defineStore } from 'pinia'
import apiService from '@/api/api-service.js'

export const useDummyStore = defineStore('dummy',{
  state: () => ({
    numberOne: 0,
  }),
  getters: {
    getNumberOne: state => state.numberOne
  },
  actions: {
    getDummyData (data, success, failure) {
      apiService.getDummyData(data, response => {
        if(response.status === 200) {
          success(response.data)
        } else {
          failure(response)
        }
      }, error => {
        failure(error)
      })
    }
  }
})