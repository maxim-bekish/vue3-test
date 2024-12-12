<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useGetUser } from '../api/query';
import { getLS, setLS } from '../lib/ls';
import { useRoute } from 'vue-router';
import { UsersId } from '../types';
import Points from './Points.vue';

const route = useRoute();

const idUser = computed(() => {
	const path = route.path.slice(1);
	return isNaN(Number(path)) ? 0 : Number(path);
});

const { data, isLoading, refetch } = useGetUser(idUser);

const users = getLS('users') as UsersId;
const userData = computed(() => users[idUser.value] || { rating: 0, message: '' });

const count = ref(userData.value.rating);
const message = ref(userData.value.message);

const changeCount = (isIncrease: boolean) => {
	count.value += isIncrease ? 1 : -1;
};

const updateData = () => {
	users[idUser.value] = { rating: count.value, message: message.value };
	setLS('users', users);
};

const info = computed(() => data.value || null);

watch(idUser, () => {
	const user = users[idUser.value] || { rating: 0, message: '' };
	count.value = user.rating;
	message.value = user.message;
	refetch();
});
</script>

<template>
	<div v-if="!isLoading && info" class="card">
		<v-avatar class="card__img" :size="130" :src="info.avatar" />
		<div class="card__content">
			<div class="card__header">
				<h2 class="card__name">{{ info.first_name }} {{ info.last_name }}</h2>
				<h3 class="card__email">{{ info.email }}</h3>
			</div>
			<points :count="count" @change-count="changeCount" />
			<div class="card__textarea">
				<v-textarea
					v-model="message"
					placeholder="Message..."
					class="card__textarea-field"></v-textarea>
			</div>
		</div>
		<div class="card__btn">
			<v-button @click="updateData" variant="primary">Save</v-button>
		</div>
	</div>

	<v-loader v-else-if="isLoading"></v-loader>

</template>

<style lang="scss" scoped>
.card {
	background: var(--white);
	width: 500px;
	border-radius: 18px;
	padding: 30px 20px 20px 20px;
	display: grid;
	grid-template-columns: 130px 1fr;
	grid-template-rows: repeat(2, auto);
	grid-column-gap: 20px;
	align-items: center;
	grid-row-gap: 20px;
	justify-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 0 12px 0px var(--gray);

	@media (max-width: #{$md}px) {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, auto);
		width: 100%;
		height: 100vh;
		border-radius: 0;
	}

	&__img {
		grid-area: 1 / 1 / 2 / 2;
	}
	&__content {
		grid-area: 1 / 2 / 2 / 3;
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 20px;
		@media (max-width: #{$md}px) {
			grid-area: 2 / 1 / 3 / 2;
		}
	}
	&__header {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	&__name {
		font-weight: 700;
		font-size: 32px;
		@media (max-width: #{$md}px) {
			font-size: 20px;
		}
	}
	&__email {
		font-weight: 500;
		font-size: 22px;
		@media (max-width: #{$md}px) {
			font-size: 16px;
		}
	}

	&__btn {
		width: 70%;
		grid-area: 2 / 1 / 3 / 3;
		@media (max-width: #{$md}px) {
			grid-area: 3 / 1 / 4 / 2;
		}
	}
}
</style>
