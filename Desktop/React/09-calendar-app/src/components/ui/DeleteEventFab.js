export const DeleteEventFab  = ({ deleteEvent }) => {
	return (
		<button
			className="btn btn-danger fab-danger"
			onClick={deleteEvent}
		>
			<i className="fas fa-trash"></i>
			<span>Borrar evento</span>
		</button>
	);
};