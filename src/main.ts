import { createApp } from 'vue';

import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './router';
// import './styles/style.scss';
import App from './pages/App.vue';

const app = createApp(App);
const components = import.meta.glob('./ui/*.vue', { eager: true });

Object.entries(components).forEach(([path, component]) => {
	const componentName = path.split('/').pop()?.replace('.vue', '') || '';
	app.component(componentName, (component as { default: any }).default);
});

app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
