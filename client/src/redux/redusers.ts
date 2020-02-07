import Actions from './actions.config';
import { Action } from 'sharing-interfaces';


const initialState = {
    userNameConnected: {firstName: "Guest", role: "guest"},
    holidays: [],
    holidaysLoading: false,
    message: "",
    errMessage: "",
    status: false
}


export default function root(state = initialState, action: Action) {
    console.log(action)
    switch (action.type) {

        case Actions.UPDATE_USERNAME_CONNECTED: {
            const { firstName, role } = action.payload;
            return {...state, userNameConnected: {firstName: firstName , role: role}};
        }

        case Actions.GET_HOLIDAYS_SUCCESS: {
            const { holidays } = action.payload;
            return { ...state, holidays, holidaysLoading: false };
        }

        case Actions.GET_HOLIDAYS_PENDING: {
            return {...state, holidaysLoading: true};
        }

        case Actions.UPDATE_FOLLOW_HOLIDAY_SUCCESS: {
            const { holidays } = action.payload;
            return { ...state, holidays };
        }
        case Actions.DELETE_HOLIDAY_SUCCESS: {
            const { holidays } = action.payload;
            return { ...state, holidays: holidays };
        }
        case Actions.UPDATE_HOLIDAY_SUCCESS: {
            const { holidays, status } = action.payload;
           
            return { ...state, holidays , status, message: "", errMessage: "" };
        }
        case Actions.UPDATE_HOLIDAY_VALIDATION_FAILD: {
            const { errMessage } = action.payload;      
            return { ...state, errMessage, status: false, message: "" };
        }
        case Actions.UPDATE_HOLIDAY_FAILD: {
            const { message } = action.payload;      
            return { ...state, message, status: false, errMessage: "" };
        }
        case Actions.RESET_ERROR_MESSAGE_VALIDATION: {
            const { errMessage } = action.payload;      
            return { ...state, errMessage };
        }

        default: {
            return state;
        }
    };
};