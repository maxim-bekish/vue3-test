<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ variant: string; active?: boolean }>();

const variantClass = computed(() => {
	const variantMap: Record<string, string> = {
		primary: 'btn-primary',
		tab: `btn-tab ${props.active ? 'btn-tab--active' : ''}`,
		icon: 'btn-icon',
		chevron: `btn-chevron ${props.active ? 'btn-chevron--active' : ''}`,
	};

	return variantMap[props.variant as keyof typeof variantMap] || 'btn-default';
});
</script>
<template>
	<button :class="['btn', variantClass]">
		<slot></slot>
	</button>
</template>
<style scope lang="scss">
.btn {
	border: 0;
	cursor: pointer;
	outline: none;
	padding: 0;
	background: none;
	transition: all 0.1s ease-in-out;
}

.btn {
	&-default {
		@extend .btn;
	}
	&-primary {
		@extend .btn;
		background-color: var(--primary);
		color: var(--white);
		border-radius: 4px;
		width: 100%;
		padding: 12px 14px;
		text-align: center;
		&:hover {
			opacity: 0.8;
		}
	}
	&-icon {
		@extend .btn;
		background-color: var(--white);
		border-radius: 4px;
		display: flex;
		align-items: center;
		aspect-ratio: 1;
		justify-content: center;
		padding: 6px;
		&:hover {
			opacity: 0.8;
		}
	}
	&-tab {
		@extend .btn;
		border-radius: 4px;
		width: 100%;
		padding-block: 4px;
		&--active {
			background-color: var(--white);
		}
	}
	&-chevron {
		z-index: 2;
		background-color: var(--asideBar);
		position: absolute;
		top: 0;
		color: var(--primary);
		padding-inline: 2px;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		height: 40px;
		right: 0;
		transform: translate(100%, 10px);
		svg {
			transform: rotate(180deg);
		}
		&--active {
			svg {
				transform: rotate(0deg);
			}
		}
	}
}
</style>
