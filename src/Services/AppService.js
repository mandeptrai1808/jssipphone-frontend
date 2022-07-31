import axios from "axios";
import { BASE_URL } from "./configURL";

export const AppService = {
    loginUser: (_data) => {
      return axios({
        url: `${BASE_URL}/users/login`,
        method: "POST",
        data: _data
      })
    },

    getHistoriesByUserId: (_userId) => {
      return axios({
        url: `${BASE_URL}/histories/get/${_userId}`,
        method: 'GET'
      })
    },

    getAddressByUserId: (_userId) => {
      return axios({
        url: `${BASE_URL}/books/get/${_userId}`,
        method: "GET"
      })
    },

    createNewAddress: (_data) => {
      return axios({
        url: `${BASE_URL}/books/create`,
        method: "POST",
        data: _data
      })
    },

    createNewHistory: (_data) => {
      return axios({
        url: `${BASE_URL}/histories/create`,
        method: "POST",
        data: _data
      })
    },

    updateAddress: (_data, _id) => {
      return axios({
        url: `${BASE_URL}/books/update/${_id}`,
        method: "PUT",
        data: _data
      })
    }
}