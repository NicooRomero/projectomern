import React, { useReducer } from 'react';
import transactionContext from './transactionContext';
import transactionReducer from './transactionReducer';
import { v4 as uuidv4 } from 'uuid';

import {
    GET_TRANSACTIONS,
    ADD_OPERATION,
    DELETE_OPERATION
} from '../../types/index';


const TransactionState = props => {

    const transactions = []

    const initialState = {
        transactions : [],
        operation: null
    }

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    // const showForm = () => {
    //     dispatch({
    //         type: FORM_OPS           
    //     })
    // }

    const getTransactions = () => {
        dispatch({
            type: GET_TRANSACTIONS,
            payload: transactions
        })
    }

    const addTransaction = transaction => {
        transaction.id = uuidv4();

        dispatch({
            type: ADD_OPERATION,
            payload: transaction
        })
    }

    const currentOp = transactionsId => {
        dispatch({
            type: GET_TRANSACTIONS,
            payload: transactionsId
        })
    }

    const deletTransaction = transactionId => {
        dispatch({
            type: DELETE_OPERATION,
            payload: transactionId
        })
    }

    return (
        <transactionContext.Provider
        value={{ 
            transactions: state.transactions,
            operation: state.operation,
            getTransactions,
            addTransaction,
            currentOp,
            deletTransaction
            }}
        >
            {props.children}
        </transactionContext.Provider>
    )

}

export default TransactionState;