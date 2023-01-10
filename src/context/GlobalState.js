import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const getLocalStorage = () => {
  let transactions = localStorage.getItem('transactions');
  if (transactions) {
    return (transactions = JSON.parse(localStorage.getItem('transactions')));
  } else {
    return [];
  }
};

// Initial state
const initialState = {
  transactions: getLocalStorage()
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}

