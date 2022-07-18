import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategoriesAction } from '../../pages/categories/CategoriesAction';
import { MyVerticallyCenteredModal } from '../modal/Modal';
const initialState = {
	status: 'inactive',
	catName: '',
	parentCatId: '',
};
const EditCategory = ({ selectedCategory }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(selectedCategory);
	const { categories } = useSelector((state) => state.categories);

	useEffect(() => {
		setForm(selectedCategory);
	}, [form]);

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
		const parentCatId = form.parentCatId ? form.parentCatId : undefined;
		//dispatch(postCategoriesAction({ ...form, parentCatId }));
		//dispatch action to update the category
		e.preventDefault();
	};
	return (
		<MyVerticallyCenteredModal title="Edit Category">
			<Form onSubmit={handleOnSubmit}>
				<Row className="g-3">
					<Col sm="2 p-1">
						<Form.Check
							name="status"
							type="switch"
							id="custom-switch"
							label="Status"
							onChange={handleOnChange}
						/>
					</Col>
					<Col sm="4">
						<Form.Control
							name="catName"
							placeholder="Category Name"
							onChange={handleOnChange}
							required
						/>
					</Col>
					<Col sm="4 ">
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
											<option value={item._id} key={item._id}>
												{item.catName}
											</option>
										)
									);
								})}
							</Form.Select>
						</Form.Group>
					</Col>
					<Col sm="1">
						<Button type="submit">Update Category</Button>
					</Col>
				</Row>
			</Form>
		</MyVerticallyCenteredModal>
	);
};
export default EditCategory;
