
import { defineStore } from 'pinia';
import WordpressService from "@/service/WordpressService";

export const useStore = defineStore('myStore', {
  state: () => ({
    websiteId: false,
  }),
  actions: {
    updateWebsiteId(newValue) {
      this.websiteId = newValue;
    },
    async fetchInitialWebsiteId() {
      try {
        if (!this.websiteId) {
          const response = await WordpressService.fetchDashboardData();
          if (response.status === 200 && response.data.success) {
            if (response.data?.agency_website_info[0].website_id) {
              let websiteId = response.data?.agency_website_info[0].website_id
              this.updateWebsiteId(websiteId);
            }
          }
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    },
  },
  setup() {
    this.fetchInitialWebsiteId();
  },
});
