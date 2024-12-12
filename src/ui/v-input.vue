<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ variant: string; placeholder: string }>();

const variantClass = computed(() => {
	const variantMap: Record<string, string> = {
		icon: 'input-icon',
	};
	return variantMap[props.variant as keyof typeof variantMap] || 'btn-default';
});
</script>
<template>
	<div :class="['input', variantClass]">
		<input type="text" :placeholder="placeholder" />
		<slot v-if="variant === 'icon'"></slot>
	</div>
</template>
<style scope lang="scss">
.input {
	&-icon {
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
		input {
			outline: none;
			width: 100%;
			border-radius: 6px;
			box-shadow: 0 0 4px 0 var(--gray);
			border: 1px solid var(--gray);
			padding: 10px 12px;
			padding-right: 24px;
		}

		svg {
			border: 0;
			position: absolute;
			right: 0;
			height: 34px;
			margin-inline: 8px;
		}
	}
}
</style>
