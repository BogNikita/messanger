import {
    FETCH_AUTO_COMPLETE_REQUEST,
    FETCH_AUTO_COMPLETE_SUCCESS,
    FETCH_AUTO_COMPLETE_FAILURE,
  } from './action.type';

export function fetchAutoCompleteRequest() {
    return {
      type: FETCH_AUTO_COMPLETE_REQUEST,
    };
  }
  
  export function fetchAutoCompleteSuccess(messages) {
    return {
      type: FETCH_AUTO_COMPLETE_SUCCESS,
      messages
    };
  }
  
  export function fetchAutoCompleteError(error) {
    return {
      type: FETCH_AUTO_COMPLETE_FAILURE,
      error,
    };
  }
  