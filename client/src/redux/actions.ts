import Actions from './actions.config';
import { getHolidaysService, updateFollowHolidayService, deleteHolidayService } from './service';



export const updateUserNameConnectedAction = (firstName: string) => {

    return {
        type: Actions.UPDATE_USERNAME_CONNECTED,
        payload: {firstName}
    };
};

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

export const updateFollowHolidaySuccess = (holidays: Array<object>) => {
    return {
        type: Actions.UPDATE_FOLLOW_HOLIDAY_SUCCESS,
        payload: holidays
    };
};

export const updateFollowHolidayAction = (holidayId: number) => {

    return async (dispach: any) => {
        const holidays = await updateFollowHolidayService(holidayId);
        if (!holidays) return;
        dispach(updateFollowHolidaySuccess(holidays))
    }
}


export const deleteHolidaySuccess = (holidays: Array<object>) => {
    return {
        type: Actions.DELETE_HOLIDAY_SUCCESS,
        payload: holidays
    };
};

export const deleteHolidayAction = (holidayId: number) => {

    return async (dispach: any) => {
        const holidays = await deleteHolidayService(holidayId);
        if (!holidays) return;
        dispach(deleteHolidaySuccess(holidays))
    }
}