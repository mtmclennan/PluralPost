import { useReducer, useEffect } from 'react';

interface State {
  modalMessage: string;
  showModal: boolean;
  showButtons: boolean;
}

type Action =
  | { type: 'SHOW_MODAL_BUTTONS'; value: boolean }
  | { type: 'HIDE_MODAL' }
  | { type: 'SET_MODAL_MESSAGE'; value: string };

const initialModalState: State = {
  modalMessage: '',
  showModal: false,
  showButtons: false,
};

const modalStateReducer = (state: State, action: Action) => {
  if (action.type === 'SHOW_MODAL_BUTTONS') {
    return { ...state, showButtons: action.value };
  }
  if (action.type === 'HIDE_MODAL') {
    return initialModalState;
  }
  if (action.type === 'SET_MODAL_MESSAGE') {
    return { ...state, modalMessage: action.value, showModal: true };
  }

  return initialModalState;
};

const useModal = (error?: string | null) => {
  const [modalState, dispatch] = useReducer(
    modalStateReducer,
    initialModalState
  );

  const setModalHandler = (value: string) => {
    dispatch({ type: 'SET_MODAL_MESSAGE', value: value });
  };

  const hideModalHandler = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  const showButtonsHandler = (value: boolean) => {
    dispatch({ type: 'SHOW_MODAL_BUTTONS', value: value });
  };

  useEffect(() => {
    if (error) {
      setModalHandler(error);
    }
  }, [error]);

  return {
    setModalMessage: setModalHandler,
    showModal: modalState.showModal,
    modalMessage: modalState.modalMessage,
    hideModal: hideModalHandler,
    setShowModalButtons: showButtonsHandler,
    showModalButtons: modalState.showButtons,
  };
};

export default useModal;
