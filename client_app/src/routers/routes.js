import React from 'react';
import HomePage from '../views/HomePage';
import CreatePage from '../views/CreatePage';
import EditPage from '../views/EditPage';
const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/create',
        exact: false,
        main: () => <CreatePage />
    },
    {
        path: '/edit/:id',
        exact: false,
        main: ({match}) => <EditPage match={match} />
    },
    {
        path: '*',
        exact: false,
        main: () => <h1>Page not found</h1>
    }
]
export default routes;