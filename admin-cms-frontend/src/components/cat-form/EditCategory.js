import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoriesAction } from '../../pages/categories/CategoriesAction';
import { MyVerticallyCenteredModal } from '../modal/Modal';

const EditCategory = ({ selectedCategory }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(selectedCategory);
	const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		setForm(selectedCategory);
	}, [selectedCategory]);

	const handleOnChange = (e) => {
		let { checked, name, value } = e.target;
		if (name === 'status') {
			value = checked ? 'active' : 'inactive';
		}
		setForm({
			...form,
			[name]: value,
		});
		console.log(form);
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const { _id, parentCatId, catName, status } = form;
		dispatch(updateCategoriesAction({ _id, parentCatId, catName, status }));
		//dispatch action to update the category
	};

	console.log(form);
	return (
		<MyVerticallyCenteredModal title="Edit Category">
			<Form onSubmit={handleOnSubmit}>
				<Row className="">
					<Col md="10 p-3">
						<Form.Check
							name="status"
							type="switch"
							id="custom-switch"
							label="Status"
							checked={form.status === 'active'}
							onChange={handleOnChange}
						/>
					</Col>
					<Col md="10 p-3">
						<Form.Control
							name="catName"
							placeholder="Category Name"
							onChange={handleOnChange}
							value={form.catName}
							required
						/>
					</Col>
					<Col md="10 p-3">
						<Form.Group as={Col} controlId="formGridState">
							<Form.Select
								name="parentCatId"
								defaultValue="Choose..."
								onChange={handleOnChange}
							>
								<option value="">**Select Parent Category**</option>

								{categories.map((item) => {
									return (
										!item.parentCatId && (
											<option
												value={item._id}
												key={item._id}
												selected={item._id === form.parentCatId}
											>
												{item.catName}
											</option>
										)
									);
								})}
							</Form.Select>
						</Form.Group>
					</Col>
					<Col md="5">
						<Button type="submit">Update Category</Button>
					</Col>
				</Row>
			</Form>
		</MyVerticallyCenteredModal>
	);
};
export default EditCategory;
