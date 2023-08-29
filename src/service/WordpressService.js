import { requests } from '.'
const baseUrl = 'https://reqres.in/api';
const WordpressService = {
  registerUser: (data) => {
    return requests(baseUrl).post(`/register`, data)
  },
  loginUser: (data) => {
    return requests(baseUrl).post(`/login`, data)
  }
}
export default WordpressService