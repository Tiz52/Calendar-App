import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal, uiOpenModal } from '../actions/ui';

export const useModal = () => {

	const dispatch = useDispatch();
	const { modalOpen } = useSelector( state => state.ui );

	const openModal = () => { 
		dispatch(uiOpenModal()); 
	};

	const closeModal = () => {
		dispatch(uiCloseModal());
	};
	
	return { modalOpen, openModal, closeModal } ;
};
