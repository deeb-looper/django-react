import { Base } from './base';

export type UserParams = {
	email: string;
	user_name: string;
	password: string;
};

export type AuthParams = {
	refresh: string; 
	access: string;
	user: { 
		id: string; 
		email: string; 
		username: string 
	};
};

export type User = UserParams & Base;