import { IUser } from '../types';

export const filterData = (data: IUser[], search: string) => {
	if (!search) return data;

	const searchValue = search.toLowerCase();
	return data.filter(user => {
		const firstName = user.first_name.toLowerCase();
		const lastName = user.last_name.toLowerCase();
		return firstName.startsWith(searchValue) || lastName.startsWith(searchValue);
	});
};