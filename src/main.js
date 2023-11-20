import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './stores/store';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    console.error(err);
};

app.use(createPinia())
app.use(useStore());
app.use(router)

app.mount('#app')

