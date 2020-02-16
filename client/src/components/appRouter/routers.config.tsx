import React from 'react';
import Login from 'components/login';
import Register from 'components/register';
import CreateHoliday from 'components/create-holiday';
import Logout from 'components/logout';
import { withAuth } from 'components/hoc/auth';
import Report from 'components/report';
import Holidays from 'components/holidays';


export const routes = [
    { authorized: "guest", title: "Login", path: "/login", component: Login },
    { authorized: "both", title: "Logout", path: "/logout", component: Logout },
    { authorized: "guest", title: "Register", path: "/register", component: Register },
    { authorized: "user", title: "MyHolidays", path: "/my-holidays", component: (props: any) =>{
        const MyHolidaysWithAuth = withAuth(Holidays);
        return <MyHolidaysWithAuth {...props}/>
    } },
    { authorized: "admin", title: "Create-holiday", path: "/create-holiday", component: (props: any) =>{
        const CreateHolidayWithAuth = withAuth(CreateHoliday);
        return <CreateHolidayWithAuth {...props}/>
    }  },
    { authorized: "admin", title: "Report", path: "/report", component:  (props: any) =>{
        const ReportWithAuth = withAuth(Report);
        return <ReportWithAuth {...props}/>
    } },
    { authorized: "admin", title: "Holidays", path: "/holidays", component:  (props: any) =>{
        const HolidaysWithAuth = withAuth(Holidays);
        return <HolidaysWithAuth {...props}/>
    } },
    { authorized: "guest", title: "/", path: "/", exact: true, component:(props: any) =>{
        const LoginWithAuth = withAuth(Login);
        return <LoginWithAuth {...props}/>
    } },
] 