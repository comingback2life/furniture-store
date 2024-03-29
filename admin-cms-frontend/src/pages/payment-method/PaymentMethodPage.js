import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { PaymentMethodForm } from '../../components/paymentMethod-form/PaymentMethodForm.js';
import { toggleModal } from '../../system-state/systemSlice.js';
import AdminLayout from '../layouts/AdminLayout.js';
import { PaymentMethodsTable } from './PaymentMethodsTable.js';
const PaymentMethodPage = () => {
	const dispatch = useDispatch();
	const [showForm, setShowForm] = useState(false);

	const handleOnModalChange = () => {
		setShowForm(true);
		dispatch(toggleModal());
	};

	return (
		<AdminLayout>
			<Row>
				<Col>
					<p className="display-6">Payment Methods</p>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col className="text-end mb-3">
					<Button variant="outline-success" onClick={handleOnModalChange}>
						<i className="fa-solid fa-plus"></i>
						Add New Payment Method
					</Button>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<PaymentMethodsTable showForm={showForm} setShowForm={setShowForm} />
				</Col>
			</Row>
		</AdminLayout>
	);
};
export default PaymentMethodPage;
