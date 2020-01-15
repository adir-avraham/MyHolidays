import Actions from './actions.config';
import { Holiday } from 'sharing-interfaces';


const initialState = {
    userNameConnected: "Guest",
    holidays: [],
    holidaysLoading: false,
}

interface Action {
    type: string; 
    payload: object | Array<object> | any;
}

export default function root(state = initialState, action: Action) {
    console.log("paylod-redux", action.payload)
    switch (action.type) {

        case Actions.UPDATE_USERNAME_CONNECTED: {
            const { firstName } = action.payload;
            return {...state, userNameConnected: firstName};
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
            if (holidays) return { ...state, holidays: holidays };
        }

        default: {
            return state;
        }
    }

}