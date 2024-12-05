<script lang="ts" setup>
import { ChevronRight, Search } from 'lucide-vue-next';
import ItemUser from './ItemUser.vue';
import Tabs from './Tabs.vue';
import { useQuery } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import { getUsers } from '../api/api';

interface Users {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}
const { data, isLoading } = useQuery<Users[]>({
	queryKey: ['users'],
	queryFn: getUsers,
});

const activeTab = ref('Clients');

console.log(activeTab);
const show = ref(false);

const toggleDrawer = () => {
	show.value = !show.value;
};

const info = computed(() => data.value || null);


</script>

<template>
	<div class="drawer" :class="{ 'drawer--active': show }" v-if="!isLoading && info">
		<button @click="toggleDrawer" class="drawer__btn-chevron btn">
			<chevron-right
				:size="16"
				:style="{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }"
				class="drawer__item-chevron" />
		</button>

		<div class="drawer__header">
			<div class="drawer__search">
				<input type="text" placeholder="Search" class="input" />
				<button class="drawer__search-btn btn btn-icon">
					<Search :size="16" />
				</button>
			</div>
			<tabs v-model:activeBtn="activeTab" />
		</div>
		<div class="drawer__list">
			<item-user :tab="activeTab" v-for="item in info" :key="item.id" :item="item" />
		</div>

		<div class="drawer__footer">
			<button class="btn btn-primary">Update List</button>
		</div>
	</div>
	<div v-else>loading</div>
</template>

<style lang="scss" scoped>
.drawer {
	height: 100vh;

	width: 25%;
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	position: relative;
	transition: all 0.3s ease-in-out;
	&--active {
		transform: translateX(-100%);
	}
	&__btn-chevron {
		height: 24px;
		z-index: 2;
		background-color: var(--asideBar);
		position: absolute;
		top: 0;
		padding-inline: 2px;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		height: 40px;
		right: 0;
		transform: translate(100%, 10px);
	}
	&__header {
		width: 100%;
		background-color: var(--asideBar);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__search {
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;

		&-btn {
			border: 0;
			position: absolute;
			right: 0;
			height: 34px;
		}
	}

	&__list {
		flex: 1;
	}

	&__btn-chevron {
		color: var(--primary);
	}

	&__footer {
		padding: 16px;
	}
}
</style>
