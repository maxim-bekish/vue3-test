<script setup lang="ts">
defineProps<{
	src: string;
	size: number;
}>();

</script>

<template>
	<div class="avatar" :style="{ width: size + 'px' }">
		<img :src="src" class="avatar__img" alt="avatar" />
	</div>
</template>

<style lang="scss" scope>
.avatar {
	overflow: hidden;
	border-radius: 12px;
	aspect-ratio: 1;

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}
</style>
