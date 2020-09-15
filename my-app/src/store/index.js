// store.js
import React, {createContext, useReducer} from 'react';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_EXIT } from './actions.js';

const initialState = {authorization: {loading: false, authentification: false}};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case LOGIN_REQUEST:
        return {...state, authorization: {
            ...state.authorization,
            loading: true,
        }}; // do something with the action
    case LOGIN_SUCCESS: 
        return {...state, authorization: {
            loading: false,
            authentification: true,
            user: action.payload
        }};
    case LOGIN_FAIL:
        return {...state, authorization: {
            loading: false,
            authentification: false
        }};
        case LOGIN_EXIT: 
        return {...state, authorization: {
            ...initialState.authorization
        }}
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }