<script setup lang="ts">
import { IUser } from '../types';
import ItemUser from './ItemUser.vue';

defineProps<{
	list: IUser[];
	activeTab: string;
}>();
</script>
<template>
	<div class="list scroll">
		<template v-if="list.length">
			<item-user :tab="activeTab" v-for="item in list" :key="item.id" :id="item.id" :item="item" />
		</template>
		<p class="list-empty" v-else>No results</p>
	</div>
</template>

<style lang="scss" scope>
.list {
	flex: 1;
	overflow-x: auto;
	&-empty {
		text-align: center;
		padding-top: 24px;
		font-size: 20px;
	}
}
</style>
