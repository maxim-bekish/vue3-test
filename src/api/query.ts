import { useQuery } from '@tanstack/vue-query';
import { IUser } from '../types';
import { getUser, getUsers } from './api';
import { ComputedRef } from 'vue';

const keys = {
	root: () => ['test-vue3'],
	userId: (id: number) => [...keys.root(), 'user', id],
	users: () => [...keys.root(), 'users'],
};

export const useGetUsers = () => {
	return useQuery<IUser[], Error>({
		queryKey: keys.users(),
		queryFn: getUsers,
	});
};

export const useGetUser = (id: ComputedRef) => {
	return useQuery<IUser, Error>({
		queryKey: keys.userId(id.value),
		queryFn: () => getUser(id.value),
	});
};
