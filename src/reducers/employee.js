import { ACTION_TYPES_EMPLOYEE } from "../actions/types";
const initialState = {
    list: []
}


export const employee = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES_EMPLOYEE.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES_EMPLOYEE.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES_EMPLOYEE.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case ACTION_TYPES_EMPLOYEE.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }
            
        default:
            return state
    }
}