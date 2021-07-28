import { Base } from './base';

export type TodoParams = {
  title: string;
  description: string;
  completed?: boolean;
};

export type Todo = TodoParams & Base;
