import React from 'react';

import './customCard.css';
const CustomCard = ({ title, count, logo }) => {
	return (
		<div className="isCard mb-3">
			<div className="isLogo">{logo}</div>
			<span className="ms-auto">{title}</span>
		</div>
	);
};

export default CustomCard;
