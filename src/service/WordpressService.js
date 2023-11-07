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
  agencyDetails: (data, headers) => {
    return requests(baseUrl).post(`/agency-website-details`, data, { headers })
  },
  getCategoryOption: () => {
    return requests(baseUrl).get(`/get-website-categories`)
  },
  regenerateWebsite: (data) => {
    return requests(baseUrl).post(`/components/regenerate`, data)
  },
  getGlobalColors: (data) => {
    return requests(baseUrl).get(`/get-components-global-colors`, {
      params: data
    },)
  },
  updateGlobalColors: (data) => {
    return requests(baseUrl).post(`/update-global-colors`, data)
  },
  Components: {
    getActiveComponents: (data) => {
      return requests(baseUrl).get(`/fetch-active-components-detail`, {
        params: data
      },)
    },
    getAllComponents: (data) => {
      return requests(baseUrl).get(`/fetch-components`, {
        params: data
      },)
    },
    changeComponent: (data) => {
      return requests(baseUrl).post(`/change-component`, data)
    },
    changeComponentPosition: (data) => {
      return requests(baseUrl).post(`/update-component-position`, data)
    },
  },
  CustomizeColors: {
    getDefaulColors: (data) => {
      return requests(baseUrl).get(`/color-combinations`, {
        params: data
      },)
    },
    changeDefaulColors: (data) => {
      return requests(baseUrl).post(`/update-color-combination`, data)
    },
  },
  CustomizeFonts: {
    getDefaulFonts: (data) => {
      return requests(baseUrl).get(`/get-fonts`, {
        params: data
      },)
    },
    changeDefaulFonts: (data) => {
      return requests(baseUrl).post(`/change-font-family`, data)
    },
  },
  WebsiteSettings: {
    getSiteDetail: (data) => {
      return requests(baseUrl).get(`/settings`, {
        params: data
      },)
    },
    updateSiteSettings: (data, headers) => {
      return requests(baseUrl).post(`/update-settings`, data, { headers })
    },
  },
  ResetPassword: {
    resetPassword: (data) => {
      return requests(baseUrl).post(`/reset-password`, data)
    },
    forgotPassword: (data) => {
      return requests(baseUrl).post(`/forgot-password`, data)
    },
  },

  ComponentsFormField: {
    getComponentsFormField: (data) => {
      return requests(baseUrl).get(`/get-component-form-fields`, {
        params: data
      },)
    },
    updateComponentsFormField: (data) => {
      return requests(baseUrl).post(`/update-component-form-fields`, data)
    },
  },

  VerifyEmail: {
    verifyEmail: (data, id) => {
      return requests(baseUrl).get(`/email/verify/${id}`, {
        params: data, // Add query parameters as an object
      })
    },

  }


}
export default WordpressService