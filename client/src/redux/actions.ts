import Actions from './actions.config';
import { getHolidaysService } from './service';



export const getHolidaysSuccessAction = (holidays: Array<object>) => {
    
    return {
        type: Actions.GET_HOLIDAYS_SUCCESS,
        payload: { holidays }
    };
};

export const getHolidaysPendingAction = () => {
    
    return {
        type: Actions.GET_HOLIDAYS_PENDING
    };
};

export const getHolidaysAction = () => {
    
    return async (dispach: any) => {
    
        dispach(getHolidaysPendingAction());
        const holidays = await getHolidaysService();
        dispach(getHolidaysSuccessAction(holidays));
    };
};