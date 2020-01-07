import mainAxios from '../components/axios/mainAxios';


export const getHolidaysService = async () => {
    try {
        const {data} = await mainAxios.post('/getHolidays');
        return data;
    } catch (ex) {
        return []
    }

}



