import React, { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import { Redirect } from 'react-router-dom';
import LinearIndeterminate from 'components/loader';
import { IWrappedComponentProps } from 'sharing-interfaces';



export const withAuth = (WrappedComponent: Function) => {

    return function (props: IWrappedComponentProps) {
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
        if (path === '/' && role === "user") return <Redirect to='/my-holidays'/>;
        if (path === '/' && role === "admin") return <Redirect to='/holidays'/>;
        if (path === "/create-holiday" && role === "admin") return <WrappedComponent {...props} />;
        if (path === "/report" && role === "admin") return <WrappedComponent {...props} />;
        if (path === "/holidays" && role === "admin") return <WrappedComponent {...props} />;
        if (path === "/my-holidays" && role === "user") return <WrappedComponent {...props} />;
        return  <Redirect to="/login" />;
    }
};