import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { TodoHooksContext } from './hooks/todo';
import AuthProvider from './hooks/auth/provider'
import * as combinedTodoHooks from './hooks/todo/combined';

import reportWebVitals from './reportWebVitals';
import RootNavigator from './navigators/root/RootNavigator';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TodoHooksContext.Provider value={combinedTodoHooks}>
        <RootNavigator />
      </TodoHooksContext.Provider>
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
