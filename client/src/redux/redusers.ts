import Actions from './actions.config';


const initialState = {
    holidays: [],
    holidaysLoading: false,
}

interface Action {
    type: string; 
    payload: object | Array<object> | any;
}

export default function root(state = initialState, action: Action) {
    switch (action.type) {
        case Actions.GET_HOLIDAYS_SUCCESS: {
            const { holidays } = action.payload;
            return { ...state, holidays, holidaysLoading: false };
        }

        case Actions.GET_HOLIDAYS_PENDING: {
            return {...state, holidaysLoading: true};
        }

        default: {
            return state;
        }
    }

}