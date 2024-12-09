<script setup lang="ts">
defineProps<{
	placeholder: string;
}>();
</script>

<template>
	<textarea :placeholder="placeholder" class="textarea"></textarea>
</template>

<style lang="scss" scope>
.textarea {
	max-height: 100px;
	width: 100%;
	padding: 8px;
	outline: none;
	height: 90px;
	border-radius: 12px;
	border-width: 2px;
	border-color: var(--bg);
	resize: none;
}
</style>
