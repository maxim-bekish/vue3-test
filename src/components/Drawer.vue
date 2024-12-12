<script lang="ts" setup>
import { ChevronRight, Search } from 'lucide-vue-next';
import ListUsers from './ListUsers.vue';

import { computed, ref, watch } from 'vue';
import { useGetUsers } from '../api/query';
import { getLS } from '../lib/ls';
import { sortByClients, sortByRating } from '../lib/sort';
import { filterData } from '../lib/filter';
import { IUser } from '../types';

const { data, isLoading } = useGetUsers();

const tabs = {
	clients: { code: '1', name: 'Clients' },
	rating: { code: '2', name: 'Rating' },
};

const activeTab = ref(tabs.clients.code);
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
		[tabs.rating.code]: () => sortByRating(filteredData, localData.value),
		[tabs.clients.code]: () => sortByClients(filteredData),
	};

	return (sortFunctions[activeTab.value] || (() => filteredData))();
});
</script>

<template>
	<div v-if="!isLoading" class="drawer-container" :class="{ 'drawer-container--active': show }">
		<v-button @click="toggleDrawer" variant="chevron" :active="show">
			<ChevronRight :size="16" />
		</v-button>

		<div class="drawer">
			<div class="drawer__header">
				<v-input placeholder="Search" v-model="search" variant="icon">
					<Search class="drawer__search-btn" :size="16" />
				</v-input>
				<v-tabs :tabs="tabs" v-model:activeBtn="activeTab" />
			</div>

			<list-users :list="info" :activeTab="activeTab"></list-users>

			<div class="drawer__footer">
				<v-button variant="primary">Update List</v-button>
			</div>
		</div>
	</div>

	<v-loader v-else-if="isLoading" />
	<div v-else-if="!data || !localData">Error loading data</div>
	<div v-else>No data available</div>
</template>

<style lang="scss" scoped>
.drawer-container {
	position: relative;
	width: 25%;
	min-width: 250px;
	transition: all 0.3s ease-in-out;
	@media (max-width: #{$md}px) {
		width: 100%;
	}
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

	&__header {
		width: 100%;
		background-color: var(--asideBar);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__footer {
		padding: 16px;
	}
}
</style>
