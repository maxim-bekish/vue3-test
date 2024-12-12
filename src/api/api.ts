import axios from 'axios';
import { getLS, setLS } from '../lib/ls';
import { IUser, UsersId } from '../types';

const URL = 'https://reqres.in/api/users';

export const getUser = async (id: number): Promise<IUser> => {
	try {
		const response = await axios(`${URL}/${id}`);
		const user = response.data.data;
		if (!user) {
			throw new Error('[USER]');
		}
		return user;
	} catch (error) {
		throw new Error('[USER]');
	}
};

export const getUsers = async (): Promise<IUser[]> => {
	try {
		const response = await axios(URL);
		const users = response.data.data;
		const storedUsers: UsersId = getLS('users') || {};
		users.forEach((user: IUser) => {
			if (!storedUsers[user.id]) {
				storedUsers[user.id] = { rating: 0, message: '' };
			}
		});
		setLS('users', storedUsers);
		return users;
	} catch (error) {
		console.error('[USERS]', error);
		throw new Error('Failed to fetch users');
	}
};
