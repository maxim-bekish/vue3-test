<script lang="ts" setup>
import { Minus, Plus } from 'lucide-vue-next';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	count: {
		type: Number,
		required: true,
		default: 0,
	},
});

const emit = defineEmits(['change-count']);

const handleChange = (isIncrease: boolean) => {
	emit('change-count', isIncrease);
};
</script>

<template>
	<div class="card__points">
		<button @click="handleChange(false)" class="card__button card__button--decrease btn btn-icon">
			<Minus :size="12" />
		</button>
		<span class="card__points-value">{{ count }} points</span>
		<button @click="handleChange(true)" class="card__button card__button--increase btn btn-icon">
			<Plus :size="12" />
		</button>
	</div>
</template>

<style lang="scss" scoped>
.card {
	&__points {
		background-color: var(--gray);
		display: flex;
		justify-content: space-between;
		padding: 2px;
		border-radius: 4px;
		align-items: center;
		&-value {
			font-weight: 500;
		}
	}
}
</style>
