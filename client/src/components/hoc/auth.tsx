import React, { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import { Redirect } from 'react-router-dom';
import LinearIndeterminate from 'components/loader'



export const withAuth = (WrappedComponent: any) => {

    return function (props: any) {
        const [status, setStatus] = useState('loading');
        const [role, setRole] = useState('loading');
        const { path } = props.match
        
        const token = localStorage.getItem("token");
        if (!token) return <Redirect to="/login" />;
    
        useEffect(() => {
            const verify = async () => {
                try {
                    const result = await mainAxios.post("/verifyToken")
                    const { status, role } = result.data;
                    setRole(role);
                    setStatus(status);
                } catch {
                    console.error("some error")
                }
            }
            verify()
        },[])

        if (status === "loading") return <LinearIndeterminate/>;
        if (!status) return <Redirect to="/login" />;
        //delete login and register paths if no use
        if ((path === '/' || path === '/login' || path === '/register')  && role === "user") return <Redirect to='/my-holidays'/>;
        if ((path === '/' || path === '/login' || path === '/register')  && role === "admin") return <Redirect to='/holidays'/>;
        //if (path === '/login' && (role !== "admin" && role !== "user") ) return <WrappedComponent {...props} />;
        if (path === "/create-holiday" && role === "admin") return <WrappedComponent {...props} />;
        //if (path === "/register" && (role !== "admin" && role !== "user")) return <WrappedComponent {...props} />;
        if (path === "/report" && role === "admin") return <WrappedComponent {...props} />;
        if (path === "/holidays" && role === "admin") return <WrappedComponent {...props} />;
        if (path === "/my-holidays" && role === "user") return <WrappedComponent {...props} />;
        return  <Redirect to="/login" />;
    }
}