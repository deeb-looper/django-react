import { useCallback } from 'react';
import { TodoHooks } from '../index';
import config from '../../../config/config';

export const useTodoAction: TodoHooks['useTodoAction'] = () => {
    const fetchTodos = useCallback(
        async () => {
            try {
                const res = await fetch(`${config.apiUrl}/todos/`);
                const todoList = await res.json();
                return todoList;
            } catch (e) {
                console.log(e);
            }
        },
        [],
    );

    return {
        fetchTodos,
    };
};
