import moment from 'moment';
import { types } from '../types/types';

const initialState = {
	events: [ {
		id: new Date().getTime(),
		title: 'Cumpleaños del jefe',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		name: 'jefe',
		user: {
			_id: '123',
			name: 'Carlos'
		}
	}
	],
	activeEvent: null,

};

export const calendarReducer = (state = initialState, { type, payload }) => {

	switch(type){

	case types.eventAddNew:
		return {
			...state,
			events: [ ...state.events, payload ]
		};

	case types.eventSetActive:
		return {
			...state,
			activeEvent: payload,
		};

	case types.eventClearActiveEvent:
		return {
			...state,
			activeEvent: null,
		};

	case types.eventUpdated:
		return {
			...state,
			events: state.events.map(
				e => (e.id === payload.id )? payload: e
			)
		};

	case types.eventDeleted:
		return {
			...state,
			events: state.events.filter( e => e.id !== state.activeEvent.id),
			activeEvent: null,
		};
	default: return state;
	}
};