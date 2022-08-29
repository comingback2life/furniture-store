import React from 'react';

import './customCard.css';
const CustomCard = ({ title, count, logo }) => {
	return (
		<div className="isCard mt-3 mb-3">
			{logo ? <div className="isLogo">{logo}</div> : <></>}
			<p className="ms-auto fw-bold">{title}</p>
			<p className="ms-auto isCardCount">{count}</p>
		</div>
	);
};

export default CustomCard;
