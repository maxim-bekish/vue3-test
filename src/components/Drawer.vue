<script lang="ts" setup>
import { ChevronRight, Search } from 'lucide-vue-next';
import ItemUser from './ItemUser.vue';
import Tabs from './Tabs.vue';
import { computed, ref } from 'vue';
import { useGetUsers } from '../api/query';
import { getLS } from '../lib/ls';
import { ITabs, IUser } from '../types';
import { sortByClients, sortByRating } from '../lib/sort';
import { filterData } from '../lib/filtr';

const { data, isLoading } = useGetUsers();

const activeTab = ref<ITabs>('clients');
const search = ref<string>('');
const show = ref<boolean>(false);
const localData = computed<IUser>(() => getLS('users'));

const toggleDrawer = () => {
	show.value = !show.value;
};

const info = computed(() => {
	if (!data.value || !localData.value) {
		return [];
	}

	const filteredData = filterData(data.value, search.value);

	const sortFunctions = {
		rating: () => sortByRating(filteredData, localData.value),
		clients: () => sortByClients(filteredData),
	};

	return (sortFunctions[activeTab.value] || (() => filteredData))();
});
</script>

<template>
	<div v-if="!isLoading" class="drawer-container" :class="{ 'drawer-container--active': show }">
		<button @click="toggleDrawer" class="drawer__btn-chevron btn">
			<ChevronRight
				:size="16"
				:style="{ transform: show ? 'rotate(180deg)' : 'rotate(0deg)' }"
				class="drawer__item-chevron" />
		</button>

		<div class="drawer">
			<div class="drawer__header">
				<div class="drawer__search">
					<input type="text" v-model="search" placeholder="Search" class="input" />
					<button class="drawer__search-btn btn btn-icon" aria-label="Search">
						<Search :size="16" />
					</button>
				</div>
				<Tabs v-model:activeBtn="activeTab" />
			</div>
			<div class="drawer__list">
				<div v-if="info.length">
					<item-user :tab="activeTab" v-for="item in info" :key="item.id" :item="item" />
				</div>
				<p class="drawer__list-empty" v-else>No results</p>
			</div>

			<div class="drawer__footer">
				<button class="btn btn-primary">Update List</button>
			</div>
		</div>
	</div>
	<div v-else-if="isLoading">loading...</div>
	<div v-else-if="!data || !localData">Error loading data</div>
	<div v-else>No data available</div>
</template>

<style lang="scss" scoped>
.drawer-container {
	position: relative;
	width: 25%;
	min-width: 250px;
	transition: all 0.3s ease-in-out;
	&--active {
		width: 0%;
		min-width: 0px;
	}
}
.drawer {
	height: 100vh;
	overflow: hidden;
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	transition: all 0.3s ease-in-out;

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
		&-empty {
			text-align: center;
			padding-top: 24px;
			font-size: 20px;
		}
	}

	&__btn-chevron {
		color: var(--primary);
	}

	&__footer {
		padding: 16px;
	}
}
</style>
