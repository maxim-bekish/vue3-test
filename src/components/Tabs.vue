<script lang="ts" setup>
import { ref } from 'vue';

const activeBtn = ref('clients');

// Функция для переключения активной кнопки
const setActive = (btn: string) => {
	activeBtn.value = btn;
	emit('update:activeBtn', btn);
};

const emit = defineEmits(['update:activeBtn']);
</script>

<template>
	<div class="block__tabs">
		<button
			:class="{ 'btn-tab--active': activeBtn === 'clients' }"
			class="btn btn-tab"
			@click="setActive('clients')">
			Clients
		</button>

		<button
			:class="{ 'btn-tab--active': activeBtn === 'rating' }"
			class="btn btn-tab"
			@click="setActive('rating')">
			Rating
		</button>
	</div>
</template>

<style lang="scss" scoped>
.block {
	&__tabs {
		padding: 2px;
		border-radius: 6px;
		background-color: var(--asideHeader);
		display: flex;
	}
}
</style>
