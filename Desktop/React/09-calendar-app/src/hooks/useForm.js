import { useCallback, useState } from 'react';

export const useForm = ( initialState = {} ) => {

	const [ values, setValues ] = useState(initialState);

	const resetForm = useCallback((props) => {
		setValues(props);
	}, [ ]);

	const handleInputChange = ({ target }) => {

		setValues({
			...values,
			[target.name] : target.value,

		});
	};

	const handleStartDateChange = (event) => {
		
		setValues({
			...values,
			start: event,
		});
	};

	const handleEndDateChange = (event) => {
		
		setValues({
			...values,
			end: event,
		});
	};
	

	return [ values, handleInputChange, handleStartDateChange, handleEndDateChange, resetForm ];

};