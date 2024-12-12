import { reactive } from 'vue';

// Реактивное состояние для данных localStorage
const storageState = reactive<Record<string, any>>({});

// Инициализация storageState из localStorage
const initStorageState = () => {
	Object.keys(localStorage).forEach(key => {
		const item = localStorage.getItem(key);
		if (item) {
			storageState[key] = JSON.parse(item);
		} else {
			storageState[key] = null;
		}
	});
};

initStorageState();

export const getLS = (key: string) => {
	return storageState[key] || null;
};

export const setLS = (key: string, value: any) => {
	storageState[key] = value;
	localStorage.setItem(key, JSON.stringify(value));
};
