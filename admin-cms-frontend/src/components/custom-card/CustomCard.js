import React from 'react';
import './customCard.css';
const CustomCard = ({ children }) => {
	return (
		<div className="isCard mt-2 mb-3">
			<div className="justify-content-between">
				Total Products
				<span className="d-flex justify-content-center display-4">
					{children}
				</span>
			</div>
		</div>
	);
};

export default CustomCard;
