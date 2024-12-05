<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next';
import { getLS, setLS } from '../lib/ls';
import { ref, onMounted, onUnmounted } from 'vue';

interface User {
  avatar: string;
  first_name: string;
  last_name: string;
  id: number;
}

defineProps<{
  item: User;
  tab: string;
}>();

// Инициализируем переменную из localStorage
const usersId = ref<any>(getLS('users'));

// Функция для обработки изменения localStorage
const handleStorageChange = (event: StorageEvent) => {
  console.log('localStorage "users" updated:', event.newValue);
  if (event.key === 'users') {
    // Обновляем значение usersId при изменении в localStorage
    usersId.value = JSON.parse(event.newValue || '{}');
  }
};

onMounted(() => {
  // Добавляем слушатель события storage для других вкладок
  window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
  // Убираем слушатель при размонтировании компонента
  window.removeEventListener('storage', handleStorageChange);
});
</script>

<template>
  <RouterLink :to="`/${item.id}`" class="block__item">
    <img v-if="tab === 'clients'" :src="item.avatar" alt="" class="block__item-img" />
    <p v-if="tab === 'rating'" class="block__item-img">{{ usersId[item.id] }}</p>
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

		&-img {
			object-fit: cover;
			object-position: center;
			width: 38px;
			aspect-ratio: 1;
			border-radius: 35%;
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
