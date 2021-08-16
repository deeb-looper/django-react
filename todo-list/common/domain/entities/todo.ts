import { Base } from './base';

export type TodoParams = {
  creator: string;
  title: string;
  description: string;
  completed?: boolean;
};

export type Todo = TodoParams & Base;
