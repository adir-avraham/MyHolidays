import Actions from './actions.config';
import { getHolidaysService, updateFollowHolidayService, deleteHolidayService, updateHolidayService } from './service';
import { Holiday } from 'sharing-interfaces';


export const updateUserNameConnectedAction = (firstName: string, role: string) => {
    return {
        type: Actions.UPDATE_USERNAME_CONNECTED,
        payload: {firstName, role}
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
    return async (dispach: Function) => {  
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
    return async (dispach: Function) => {
        const holidays = await updateFollowHolidayService(holidayId);
        if (!holidays) return;
        dispach(updateFollowHolidaySuccess(holidays))
    };
};


export const deleteHolidaySuccess = (holidays: Array<Holiday>) => {
    return {
        type: Actions.DELETE_HOLIDAY_SUCCESS,
        payload: holidays
    };
};

export const deleteHolidayAction = (holidayId: number) => {
    return async (dispach: Function) => {
        const holidays = await deleteHolidayService(holidayId);
        if (!holidays) return;
        dispach(deleteHolidaySuccess(holidays))
    };
};

export const updateHolidaySuccess = (data: Array<Holiday>) => {
    return {
        type: Actions.UPDATE_HOLIDAY_SUCCESS,
        payload: data
    };
};

export const updateHolidayAction = (holiday: Holiday) => {
    return async (dispach: Function) => {
        const data = await updateHolidayService(holiday);
        if (!data) return;
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

export const resetErrorMessageValidationAction = (errMessage: string) => {
    return {
        type: Actions.RESET_ERROR_MESSAGE_VALIDATION,
        payload: {errMessage}
    };
};