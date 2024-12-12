import { createRouter, createWebHistory } from 'vue-router';

import Card from './components/Card.vue';

const routes = [
	{
		path: '/:id',
		name: 'Card',
		component: Card,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
