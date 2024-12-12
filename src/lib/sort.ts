import { IUser } from '../types';

export const sortByRating = (data: IUser[], localData: any) => {
	return [...data].sort((a, b) => (localData[b.id]?.rating || 0) - (localData[a.id]?.rating || 0));
};

export const sortByClients = (data: IUser[]) => {
	return [...data].sort((a, b) => a.first_name.localeCompare(b.first_name));
};
