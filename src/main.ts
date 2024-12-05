import { createApp } from 'vue';

import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './router';
import './styles/style.scss';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
