import React from 'react';
import CustomCard from '../../components/custom-card/CustomCard';
import AdminLayout from '../layouts/AdminLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';

export const Dashboard = () => {
	return (
		<AdminLayout>
			<h4 className="py-3">Dashboard</h4>
			<span className="lead">Product Summary</span>
			<div className="productInfo d-flex">
				<CustomCard>555</CustomCard>
				<CustomCard />
			</div>
			<div className="user-info">
				<CustomCard title="User Information" />
			</div>
			<div className="last-orders">Last 5 orders</div>
			<div className="top-5">Top 5 Products </div>
		</AdminLayout>
	);
};
