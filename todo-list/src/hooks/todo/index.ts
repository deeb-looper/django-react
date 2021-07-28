import React from 'react';
import { useClient } from '../client';
import { Todo,  TodoParams } from '../../../common/domain/entities/todo';

export type TodoHooks = {
    useTodoAction(): {
        fetchTodos: () => Promise<Todo[] | undefined>;
        addTodo: (todo: TodoParams) => Promise<Todo | null>;
        updateTodo: (id: string, todo: TodoParams) => Promise<Todo | null>;
        deleteTodo: (id: string) => Promise<void>;
    };
};


export const TodoHooksContext = React.createContext<TodoHooks | null>(
    null,
);

export const useTodoAction: TodoHooks['useTodoAction'] = () => {
    const client = useClient(TodoHooksContext);
    return client.useTodoAction();
};