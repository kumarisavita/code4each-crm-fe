import { requests } from '.'
const baseUrl = 'https://reqres.in/api';
const WordpressService = {
  registerUser: (data) => {
    return requests(baseUrl).post(`/register`, data)
  },
  loginUser: (data) => {
    return requests(baseUrl).post(`/login`, data)
  },
  fetchDashboardData: (data) => {
    return requests(baseUrl).get(`/dashboard`)
  },
  resendLink: (data) => {
    return requests(baseUrl).get(`/email/resend`)
  },
  agencyDetails: (data) => {
    return requests(baseUrl).post(`/agency-details`, data)
  },
  getCategoryOption: () => {
    return requests(baseUrl).get(`/get-website-categories`)
  },
}
export default WordpressService