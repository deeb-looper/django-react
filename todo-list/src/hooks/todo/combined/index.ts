import { useCallback } from 'react';
import axios from 'axios';
import { TodoHooks } from '../index';
import config from '../../../config/config';
import { TodoParams } from '../../../../common/domain/entities/todo';

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

    const addTodo = useCallback(
        async (todo: TodoParams) => {
            try {
                const res = await axios.post(`${config.apiUrl}/todos/`,todo);
                return res.data;
            } catch (e) {
                throw new Error(e);
            }
        },
        [],
    );

    const updateTodo = useCallback(
        async (id: string, todo: TodoParams) => {
            try {
                const res = await axios.put(`${config.apiUrl}/todos/${id}/`,todo);
                return res.data;
            } catch (e) {
                throw new Error(e);
            }
        },
        [],
    );

    const deleteTodo = useCallback(
        async (id: string) => {
            try {
                await axios.delete(`${config.apiUrl}/todos/${id}/`);
            } catch (e) {
                throw new Error(e);
            }
        },
        [],
    );

    return {
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
    };
};
