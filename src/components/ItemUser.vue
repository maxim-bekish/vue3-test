<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next';
import { getLS } from '../lib/ls';
import { ref } from 'vue';
import { IUser, UsersId } from '../types';

defineProps<{
	item: IUser;
	tab: string;
}>();

const usersId = ref<UsersId>(getLS('users'));
</script>

<template>
	<RouterLink :to="`/${item.id}`" class="block__item">
		<div class="block__item-preview">
			<img v-if="tab === 'clients'" :src="item.avatar" alt="" class="block__item-img" />
			<p v-if="tab === 'rating'" class="block__item-rating">{{ usersId[item.id].rating }}</p>
		</div>
		<p class="block__item-name">{{ item.first_name }} {{ item.last_name }}</p>
		<ChevronRight :size="16" class="block__item-chevron" />
	</RouterLink>
</template>

<style lang="scss" scoped>
.block {
	&__item {
		cursor: pointer;
		display: flex;
		padding: 18px 16px;
		align-items: center;
		gap: 12px;
		transition: all 0.1s ease-in-out;
		&:hover {
			background-color: var(--gray);
		}
		border-bottom: 1px solid var(--gray);
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
		&-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			border-radius: 35%;
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
