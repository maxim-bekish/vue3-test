<script setup lang="ts">
import { useRoute } from 'vue-router';
import Drawer from '../components/Drawer.vue';
import { computed } from 'vue';
const route = useRoute();

const idUser = computed(() => {
	return route.path === '/';
});
</script>

<template>
	<div class="page">
		<drawer />
		<div class="page__card">
			<div class="page__card-empty" v-if="idUser">Select a client</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	display: flex;

	&__card {
		height: 100vh;
		flex: 1;
		position: relative;

		&-empty {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 40px;
		}
	}git commit -m "init"
}
</style>
