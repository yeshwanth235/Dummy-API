import commonService from "@/api/index";

const apiService = {
  getDummyData(data, callback, errHandler) {
    commonService.getDataViaApi(`https://dummyapi.online/api/${data}`, callback, errHandler)
  }
}

export default apiService