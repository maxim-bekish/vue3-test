import axios from 'axios';
import { getLS, setLS } from '../lib/ls';

const URL = 'https://reqres.in/api/users';

export const getUser = async (id: number) => {
	try {
		const response = await axios(`${URL}/${id}`);
		return response.data.data;
	} catch (error) {
		console.error('[USER]', error);
	}
};
export const getUsers = async () => {
	try {
		const response = await axios(URL);
		let users = response.data.data;
		let storedUsers = getLS('users');

		users.forEach(user => {
			if (!storedUsers[user.id]) {
				storedUsers[user.id] = 0;
			}
		});
		setLS('users', storedUsers);

		return users;
	} catch (error) {
		console.error('[USERS]', error);
	}
};
