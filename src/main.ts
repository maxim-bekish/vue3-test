import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './router';
import './style.scss';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.use(pinia);

app.mount('#app');
