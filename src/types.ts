export interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

export type UsersId = Record<number, UserRating>;

interface UserRating {
	rating: number;
	message: string;
}
export interface ITab {
	code: string;
	name: string;
}
