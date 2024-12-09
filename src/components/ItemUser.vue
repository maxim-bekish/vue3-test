<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next';
import { getLS } from '../lib/ls';
import { ref } from 'vue';
import { IUser, UsersId } from '../types';

defineProps<{
	item: IUser;
	tab: string;
}>();
const activeItemId = ref(null);
const usersId = ref<UsersId>(getLS('users'));
</script>

<template>
	<RouterLink :to="`/${item.id}`" class="block__item" :class="{ activeItemId }">
		<div class="block__item-preview">
			<v-avatar v-if="tab === '1'" class="card__img" :size="38" :src="item.avatar" />
			<p v-if="tab === '2'" class="block__item-rating">{{ usersId[item.id].rating }}</p>
		</div>
		<p class="block__item-name">{{ item.first_name }} {{ item.last_name }}</p>

		<ChevronRight :size="16" class="block__item-chevron" />
	</RouterLink>
</template>

<style lang="scss" scoped>
.router-link-active {
	background-color: var(--gray);
}
.block {
	&__item {
		cursor: pointer;
		display: flex;
		padding: 18px 16px;
		align-items: center;
		gap: 12px;
		transition: all 0.1s ease-in-out;
		border-bottom: 1px solid var(--gray);
		@media (hover: hover) {
			&:hover {
				background-color: var(--gray);
			}
		}
		&:last-child {
			border-bottom: none;
		}
		&-preview {
			width: 38px;
			height: 38px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&-rating {
			font-size: 28px;
			font-weight: 900;
		}
		&-name {
			font-size: 16px;
			font-weight: 500;
			flex: 1;
		}
		&-chevron {
			color: var(--primary);
		}
	}
}
</style>
