import mainAxios from '../components/axios/mainAxios';
import { Holiday } from 'sharing-interfaces';



export const getHolidaysService = async () => {
    try {
        const {data} = await mainAxios.get('/holidays');
        const { holidays } = data
        return holidays;
    } catch (ex) {
        return []
    };
};


export const updateFollowHolidayService = async (holidayId: number) => {
    try{ 
        const result = await mainAxios.put('/updateFollowStatus', {holidayId});
        const { data } = result;
        return data;
    } catch {
        console.error("error from updateFollowAction")
    };
};


export const deleteHolidayService = async (holidayId: number) => {
    try{ 
        const result = await mainAxios.post('/deleteHoliday', {holidayId});
        const { data } = result;
        return data;
    } catch {
        console.error("error from deleteHolidayAction")
    };
};


export const updateHolidayService = async (holiday: Holiday) => {
    try{ 
        const result = await mainAxios.put('/updateHoliday', holiday);       
        const { data } = result;
        return data;
    } catch {
        console.error("error from updateHolidayAction")
    };
};