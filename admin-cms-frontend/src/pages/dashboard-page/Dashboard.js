import React from 'react';
import CustomCard from '../../components/custom-card/CustomCard';
import AdminLayout from '../layouts/AdminLayout';
import { FcPackage, FcApproval, FcHighPriority } from 'react-icons/fc';
export const Dashboard = () => {
	return (
		<AdminLayout>
			<span className="lead fw-bold">Product Summary</span>
			<div className="productInfo d-flex mt-3 justify-content-around">
				<CustomCard title="Total Products" count="555" logo={<FcPackage />} />
				<CustomCard title="Active Products" count="400" logo={<FcApproval />} />
				<CustomCard
					title="Inactive Products"
					count="400"
					logo={<FcHighPriority />}
				/>
			</div>
			<span className="lead fw-bold">Product Summary</span>
			<div className="productInfo d-flex mt-3">
				<CustomCard title="Total Products" count="555" logo={<FcPackage />} />
				<CustomCard title="Active Products" count="400" logo={<FcApproval />} />
				<CustomCard
					title="Inactive Products"
					count="400"
					logo={<FcHighPriority />}
				/>
			</div>
		</AdminLayout>
	);
};
