import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import { customStyles } from '../../helpers/center-modal-style';
import moment from 'moment';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { useModal } from '../../hooks/useModal';
import { useEvent } from '../../hooks/useEvent';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const now1 = now.clone().add(1, 'hours');

const init = {
	title: 'Evento',
	notes: '',
	start: now.toDate(),
	end: now1.toDate(),
};

export const CalendarModal  = () => {

	const [ titleValid, setTitleValid ] = useState(true);
	const [ formValues, handleInputChange, handleStartDateChange, handleEndDateChange, resetForm ] = useForm( init );

	const { title, notes, start, end } = formValues;

	const { modalOpen,  closeModal  } = useModal();
	const { activeEvent, addEvent, clearActiveEvent, updateEvent } = useEvent();

	useEffect(() => {
	
		activeEvent? resetForm(activeEvent): resetForm(init);

	}, [ activeEvent, resetForm ]);


	const handleCloseModal = () => {
		closeModal();
		clearActiveEvent();
		resetForm(init);
	};

	const handleSubmitForm = (e) => {

		e.preventDefault();

		const momentStart = moment (start);
		const momentEnd = moment(end);

		if ( momentStart.isSameOrAfter(momentEnd)){
			return 	Swal.fire('Error', 'La fecha final debe ser mayor a la fecha inicial', 'error');
		}

		if(title.trim().length < 2){
			return setTitleValid(false);
		}

		if (activeEvent) {
			updateEvent (formValues);
		}else{
			addEvent({
				...formValues,
				id: new Date().getTime(),
				user: {
					_id: '123',
					name: 'Carlos',
				}
			});
		}
		
		
		setTitleValid(true);
		closeModal();
		clearActiveEvent();
		resetForm(init);
	};


	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={handleCloseModal}
			style={customStyles}
			closeTimeoutMS={ 200 }
			className='modal'
			overlayClassName='modal-fondo'
		>
			<h1> {activeEvent?'Editar evento':'Nuevo evento'} </h1>
			<hr />
			<form 
				className="container"
				onSubmit={handleSubmitForm}	
			>

				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={start}
						locale='es-US'
						className='form-control'
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={end}
						minDate={start}
						locale='es-US'
						className='form-control'
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Titulo y notas</label>
					<input 
						type="text" 
						className={`form-control ${ !titleValid && 'is-invalid'}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
				</div>

				<div className="form-group">
					<textarea 
						type="text" 
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={notes}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Información adicional</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>

			</form>
		</Modal>
	);
};
