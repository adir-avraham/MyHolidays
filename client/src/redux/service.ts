import mainAxios from '../components/axios/mainAxios';


export const getHolidaysService = async () => {
    try {
        const {data} = await mainAxios.post('/getHolidays');
        return data;
    } catch (ex) {
        return []
    }

}


export const updateFollowHolidayService = async (holidayId: number) => {
    try{ 
        const result = await mainAxios.post('/updateFollowStatus', {holidayId});
        const { data } = result;
        return data;
    } catch {
        console.error("error from updateFollowAction")
    }
  }

