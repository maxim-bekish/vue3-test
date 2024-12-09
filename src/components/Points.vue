<script lang="ts" setup>
import { Minus, Plus } from 'lucide-vue-next';

defineProps({
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
		<v-button @click="handleChange(false)" variant="icon">
			<Minus :size="12" />
		</v-button>
		<span class="card__points-value">{{ count }} points</span>
		<v-button @click="handleChange(true)" variant="icon">
			<Plus :size="12" />
		</v-button>
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
