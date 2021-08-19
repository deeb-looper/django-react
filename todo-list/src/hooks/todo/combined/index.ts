import { useCallback } from 'react';
import axios from '../../../config/axios';
import { TodoHooks } from '../index';
import { TodoParams } from '../../../../common/domain/entities/todo';

export const useTodoAction: TodoHooks['useTodoAction'] = () => {
    const fetchTodos = useCallback(
        async () => {
            try {
                const res = await axios.get(`todos/`);
                const todoList = await res.data;
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
                const res = await axios.post(`todos/`,todo);
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
                const res = await axios.put(`todos/${id}/`,todo);
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
                await axios.delete(`todos/${id}/`);
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
