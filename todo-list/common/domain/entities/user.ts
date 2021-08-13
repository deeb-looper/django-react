import { Base } from './base';

export type UserParams = {
	email: string;
	user_name: string;
	password: string;
};

export type User = UserParams & Base;