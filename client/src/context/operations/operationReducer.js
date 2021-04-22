import {
    GET_OPERATIONS,
    ADD_OPERATION,
    SELECTED_OPERATION,
    DELETE_OPERATION,
    EDIT_OPERATION
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case GET_OPERATIONS:
            return {
                ...state,
                userSesion: state.operations.filter(operation => operation.userId === action.payload)
            }
        case ADD_OPERATION:
            return {
                ...state,
                operations: [...state.operations, action.payload]
            }
        case DELETE_OPERATION:
            return {
                ...state,
                operations: state.operations.filter(operation  => operation.id !== action.payload)
            }
        case SELECTED_OPERATION:
            return {
                ...state,
                operationSelected: action.payload
            }
        case EDIT_OPERATION:
            return {
                ...state,
                operations: state.operations.map(operation => operation.id === action.payload.id ? action.payload : operation),
                operationSelected: null
            }
        default:
            return state;
    }
}