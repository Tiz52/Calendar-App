import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';


import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useModal } from '../../hooks/useModal';
import { useEvent } from '../../hooks/useEvent';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen  = () => {
	
	const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month');

	const { openModal }   = useModal();
	const { events, activeEvent, setActiveEvent, deleteEvent, clearActiveEvent } = useEvent();

	const onSelectEvent = (event) => {
		setActiveEvent(event);		
	};

	const onDoubleClick = () => {
		openModal();
	};

	const onViewChange = (event) => {
		setLastView(event);
		localStorage.setItem('lastView', event);
	};
	
	const onSelectSlot = (event) => {
		clearActiveEvent();
	};


	const eventStyleGetter =(event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: 0.8,
			display: 'block',
			color: 'white',
		};

		return {
			style
		};

	};

	return (
		<div className='calendar-screen'>
			<Navbar/>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				view= {lastView}
				onSelectSlot= {onSelectSlot}
				selectable = {true}
				eventPropGetter={eventStyleGetter}
				components={{
					event:  CalendarEvent 
				}}
			/>
			<AddNewFab openModal={openModal}/>
			{activeEvent && <DeleteEventFab deleteEvent={deleteEvent}/>}
			<CalendarModal />
		</div>
	);
};
