import React from 'react';
import Login from 'components/login';
import Register from 'components/register';
import Holidays from 'components/holidays';
import CreateHoliday from 'components/create-holiday';
import Logout from 'components/logout';
import { withAuth } from 'components/hoc/auth';



export const routes = [
    { isVisibale: true, title: "Login", path: "/login", component: Login },
    { isVisibale: true, title: "Logout", path: "/logout", component: Logout },
    { isVisibale: true, title: "Register", path: "/register", component: Register },
    { isVisibale: true, title: "MyHolidays", path: "/holidays", component: (props: any) =>{
        const HolidaysWithAuth = withAuth(Holidays);
        return <HolidaysWithAuth {...props}/>
    } },
    { isVisibale: true, title: "Create-holiday", path: "/create-holiday", component: (props: any) =>{
        const CreateHolidayWithAuth = withAuth(CreateHoliday);
        return <CreateHolidayWithAuth {...props}/>
    }  },
] 