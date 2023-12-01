import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './stores/store';
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    console.error(err);
};

app.use(vue3GoogleLogin, {
    clientId: '467874272347-f241lioo004ksju0qudsroorkb5lf6au.apps.googleusercontent.com'

})
app.use(createPinia())
app.use(useStore());
app.use(router)

app.mount('#app')

