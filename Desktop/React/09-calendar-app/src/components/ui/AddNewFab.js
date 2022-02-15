export const AddNewFab  = ({ openModal }) => {
	return (
		<button
			className="btn btn-primary fab"
			onClick={openModal}
		>
			<i className="fas fa-plus"></i>
		</button>
	);
};