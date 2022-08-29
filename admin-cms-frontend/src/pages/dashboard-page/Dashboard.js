import React from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const Dashboard = () => {
	return (
		<AdminLayout>
			<div className="productInfo">Product Information Section</div>
			<div className="user-info">User Information</div>
			<div className="last-orders">Last 5 orders</div>
			<div className="top-5">Top 5 Products </div>
		</AdminLayout>
	);
};
