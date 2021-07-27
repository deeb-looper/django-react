import React from 'react';
import { useClient } from '../client';
import { Todo } from '../../../common/domain/entities/todo';

export type TodoHooks = {
    useTodoAction(): {
        fetchTodos: () => Promise<Todo[] | undefined>;
    };
};


export const TodoHooksContext = React.createContext<TodoHooks | null>(
    null,
);

export const useTodoAction: TodoHooks['useTodoAction'] = () => {
    const client = useClient(TodoHooksContext);
    return client.useTodoAction();
};