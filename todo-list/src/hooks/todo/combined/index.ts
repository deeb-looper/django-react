import { useCallback } from 'react';
import axios from '../../../config/axios';
import { TodoHooks } from '../index';
import urls from '../../../constants/urls';
import { TodoParams } from '../../../../common/domain/entities/todo';

export const useTodoAction: TodoHooks['useTodoAction'] = () => {
    const fetchTodos = useCallback(
        async () => {
            try {
                const res = await axios.get(`${urls.todo}`);
                return res.data;
            } catch (e) {
                throw new Error(e);
            }
        },
        [],
    );

    const addTodo = useCallback(
        async (todo: TodoParams) => {
            try {
                const res = await axios.post(`${urls.todo}`,todo);
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
                const res = await axios.put(`${urls.todo}${id}/`,todo);
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
                await axios.delete(`${urls.todo}${id}/`);
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
