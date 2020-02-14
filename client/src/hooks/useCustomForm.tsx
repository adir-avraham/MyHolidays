import { useState, ChangeEvent } from 'react';

export default function useCustomForm(initialState: any) {

    const [data, setData] = useState(initialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData({...data, [name]: value});
    }

    return [data, handleChange];
};