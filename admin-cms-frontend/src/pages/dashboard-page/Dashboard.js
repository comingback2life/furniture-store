import React from 'react';
import CustomCard from '../../components/custom-card/CustomCard';
import AdminLayout from '../layouts/AdminLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { FcPackage } from 'react-icons/fc';
export const Dashboard = () => {
	return (
		<AdminLayout>
			<h4 className="py-3">Dashboard</h4>
			<span className="lead">Product Summary</span>
			<div className="productInfo d-flex mt-3">
				<CustomCard title="Total Products" count="555" logo={<FcPackage />} />
				<CustomCard title="Active Products" count="400" />
				<CustomCard title="Inactive Products" count="400" />
			</div>
			<span className="lead">Product Summary</span>
			<div className="productInfo d-flex mt-3">
				<CustomCard title="Total Products" count="555" logo={<FcPackage />} />
				<CustomCard title="Active Products" count="400" />
				<CustomCard title="Inactive Products" count="400" />
			</div>
		</AdminLayout>
	);
};
