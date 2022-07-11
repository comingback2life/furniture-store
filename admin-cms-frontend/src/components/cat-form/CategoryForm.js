import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
const initialState = {
	catName: '',
	parentCat: '',
};
const CategoryForm = () => {
	const [form, setForm] = useState(initialState);
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
		console.log(form);
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Form onSubmit={handleOnSubmit}>
			<Row className="g-3">
				<Col md="5">
					<Form.Control
						name="catName"
						placeholder="Category Name"
						onChange={handleOnChange}
						required
					/>
				</Col>
				<Col md="5">
					<Form.Group as={Col} controlId="formGridState">
						<Form.Select
							name="parentCat"
							defaultValue="Choose..."
							onChange={handleOnChange}
						>
							<option value="">Select Parent Category (if any)</option>
							<option value="Ok">...More Coming Dynamically</option>
						</Form.Select>
					</Form.Group>
				</Col>
				<Col md="2">
					<Button type="submit">Add Category</Button>
				</Col>
			</Row>
		</Form>
	);
};
export default CategoryForm;
