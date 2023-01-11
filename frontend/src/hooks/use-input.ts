import React, { useReducer } from 'react';

type State = {
  value: string;
  isTouched: boolean;
};

type Action =
  | { type: 'INPUT'; value: string }
  | { type: 'BLUR' }
  | { type: 'RESET' }
  | { type: 'LOADED_DATA'; value: string };

const initialInputState: State = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state: State, action: Action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  if (action.type === 'LOADED_DATA') {
    return { value: action.value, isTouched: false };
  }
  return initialInputState;
};

type ValidateType = (s: string) => boolean;

const useInput = (validateValue: ValidateType) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const setValueHandler = (value: string) => {
    dispatch({ type: 'LOADED_DATA', value: value });
  };

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    setValue: setValueHandler,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
