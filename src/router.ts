import { createRouter, createWebHistory } from 'vue-router';

import card from './components/card.vue';

const routes = [
	{
		path: '/:id',
		name: 'Card',
		component: card,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
