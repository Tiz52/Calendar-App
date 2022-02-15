import { useDispatch, useSelector } from 'react-redux';
import { eventAddNew, eventClearActiveEvent, eventDeleted, eventSetActive, eventUpdated } from '../actions/events';


export const useEvent = () => {

	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector( state => state.calendar );
 
	const addEvent = (event) => {
		dispatch(eventAddNew(event));

	};

	const setActiveEvent = (event) => {
		dispatch(eventSetActive(event));
	};

	const clearActiveEvent = () => {
		dispatch(eventClearActiveEvent());
	};

	const updateEvent = (event) => {
		dispatch(eventUpdated(event));
	};

	const deleteEvent = () => {
		dispatch(eventDeleted());
	};

	return { events, activeEvent, setActiveEvent, addEvent, clearActiveEvent, updateEvent, deleteEvent };
};