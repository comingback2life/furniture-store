import React from 'react';
import CustomCard from '../../components/custom-card/CustomCard';
import AdminLayout from '../layouts/AdminLayout';
import { FcPackage, FcApproval, FcHighPriority, FcHome } from 'react-icons/fc';
import { Col, Row } from 'react-bootstrap';
export const Dashboard = () => {
	return (
		<AdminLayout>
			<Row>
				<span className="px-5 text-muted">
					<FcHome />
					/Dashboard
				</span>
			</Row>
			<Row>
				<Col>
					<span className="lead fw-bold">Product Summary</span>
					<div className="productInfo d-flex mt-3">
						<CustomCard
							title="Total Products"
							count="555"
							logo={<FcPackage />}
						/>
						<CustomCard
							title="Active Products"
							count="400"
							logo={<FcApproval />}
						/>
						<CustomCard
							title="Inactive Products"
							count="400"
							logo={<FcHighPriority />}
						/>
					</div>
					<span className="lead fw-bold">Product Summary</span>
					<div className="productInfo d-flex mt-3">
						<CustomCard
							title="Total Products"
							count="555"
							logo={<FcPackage />}
						/>
						<CustomCard
							title="Active Products"
							count="400"
							logo={<FcApproval />}
						/>
						<CustomCard
							title="Inactive Products"
							count="400"
							logo={<FcHighPriority />}
						/>
					</div>
				</Col>
			</Row>
		</AdminLayout>
	);
};
