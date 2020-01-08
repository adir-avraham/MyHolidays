import React, { useState, useEffect } from 'react';
import mainAxios from 'components/axios/mainAxios';
import { Redirect } from 'react-router-dom';

export const withAuth = (WrappedComponent: any) => {

    return function (props: any) {
        const [status, setStatus] = useState('loading');
        
        const token = localStorage.getItem("token");
        if (!token) return <Redirect to="/login" />;
    
        useEffect(() => {
            const verify = async () => {
                try {
                    const result = await mainAxios.post("/v")
                    const { status } = result.data;
                    console.log("status", result)
                    setStatus(status);
                } catch {
                    console.error("some error")
                }
            }
            verify()
        },[])

        if (status === "loading") return <div>...................................................... loader no verify.........................................................</div>
        if (!status) return <Redirect to="/login" />
        return <WrappedComponent {...props} />
        
    }

}