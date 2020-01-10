import React, { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import { Redirect } from 'react-router-dom';
import LinearIndeterminate from 'components/loader'



export const withAuth = (WrappedComponent: any) => {

    return function (props: any) {
        const [status, setStatus] = useState('loading');
        const [path, setPath] = useState('loading');
        const [role, setRole] = useState('loading');
        
        const token = localStorage.getItem("token");
        if (!token) return <Redirect to="/login" />;
    
        useEffect(() => {
            const verify = async () => {
                try {
                    const result = await mainAxios.post("/verifyToken")
                    const { status, role } = result.data;
                    const { path } = props.match
                    setPath(path);
                    setRole(role);
                    setStatus(status);
                } catch {
                    console.error("some error")
                }
            }
            verify()
        },[])

        if (status === "loading" || path === "loading" ) return <LinearIndeterminate/>;
        if (!status) return <Redirect to="/login" />;
        if (path === "/create-holiday" && role === "admin") return <WrappedComponent {...props} />;
        if (path === "/holidays" && role === "user") return <WrappedComponent {...props} />;
        return  <Redirect to="/login" />;
    }

}