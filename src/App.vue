<script setup lang="ts">
import AsideBar from './components/Drawer.vue';
</script>

<template>
	<div class="page">
		<aside-bar></aside-bar>

		<div class="page__card">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.page {
	display: flex;
	// &__aside {
	// 	width: 500px;
	// }
	&__card {
		height: 100vh;
		flex: 1;
		position: relative;
	}
}
</style>
