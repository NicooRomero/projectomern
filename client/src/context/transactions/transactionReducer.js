import {
    GET_TRANSACTIONS,
    ADD_OPERATION,
    DELETE_OPERATION
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        case ADD_OPERATION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case DELETE_OPERATION:
            return {
                ...state,
                transactions: state.transactions.filter(transactions => transactions.id === action.payload)
            }
        default:
            return state;
    }
}