import react from 'react';
import Login from 'components/login';
import Register from 'components/register';
import Navbar from 'components/navbar';
import Holidays from 'components/holidays';
import CreateHoliday from '../../components/create-holiday';


export const routes = [
    { isVisibale: true, title: "Login", path: "/login", component: Login },
    { isVisibale: true, title: "Register", path: "/register", component: Register },
    { isVisibale: true, title: "Holidays", path: "/holidays", component: Holidays },
    { isVisibale: true, title: "Create-holiday", path: "/create-holiday", component: CreateHoliday },
] 