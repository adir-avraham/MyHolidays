import Actions from './actions.config';
import { getHolidaysService, updateFollowHolidayService, deleteHolidayService, updateHolidayService } from './service';
import { Holiday } from 'sharing-interfaces';



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
    };
};


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
    };
};

export const updateHolidaySuccess = (data: Array<object>) => {
    return {
        type: Actions.UPDATE_HOLIDAY_SUCCESS,
        payload: data
    };
};

export const updateHolidayAction = (holiday: Holiday) => {
    return async (dispach: any) => {
        const data = await updateHolidayService(holiday);
        if (!data) return;
        console.log("data  from action =>", data)
        const errMessage = data.errMessage ? data.errMessage.details[0].message : 0;
        if (errMessage) return dispach(updateHolidayValidationfaild(errMessage));
        const { message, status } = data;
        if (message && !status) return dispach(updateHolidayfaild(message))
        if (status) return dispach(updateHolidaySuccess(data))
    }
}

export const updateHolidayValidationfaild = (errMessage: string) => {
    return {
        type: Actions.UPDATE_HOLIDAY_VALIDATION_FAILD,
        payload: {errMessage}
    };
};


export const updateHolidayfaild = (message: string) => {
    return {
        type: Actions.UPDATE_HOLIDAY_FAILD,
        payload: {message}
    };
};

