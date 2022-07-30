import { useReducer, useEffect } from 'react';

const initialModalState = {
  modalMessage: '',
  showModal: false,
  showButtons: false,
};

const modalStateReducer = (state, action) => {
  if (action.type === 'SHOW_MODAL_BUTTONS') {
    console.log('Show Buttons');
    return { ...state, showButtons: action.value };
  }
  if (action.type === 'HIDE_MODAL') {
    return { showModal: false, showButtons: false, modalMessage: '' };
  }
  if (action.type === 'SET_MODAL_MESSAGE') {
    return { ...state, modalMessage: action.value, showModal: true };
  }

  return modalStateReducer;
};

const useModal = (error) => {
  const [modalState, dispatch] = useReducer(
    modalStateReducer,
    initialModalState
  );

  const setModalHandler = (value) => {
    dispatch({ type: 'SET_MODAL_MESSAGE', value: value });
  };

  const hideModalHandler = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  const showButtonsHandler = (value) => {
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
