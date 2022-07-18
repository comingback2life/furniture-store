import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchCategoriesAction,
	deleteCategoriesAction,
} from '../../pages/categories/CategoriesAction';
import { toggleModal } from '../../system-state/systemSlice';
import EditCategory from '../cat-form/EditCategory';

const CategoryTable = () => {
	const dispatch = useDispatch();
	const [selectedCategory, setSelectedCategory] = useState({});
	const { categories } = useSelector((state) => state.categories);
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, []);

	const handleOnDelete = (_id) => {
		if (window.confirm('Are you sure you want to delete this category?')) {
			dispatch(deleteCategoriesAction(_id));
		}
	};
	const handleOnEdit = (category) => {
		setSelectedCategory(category);
		dispatch(toggleModal());
	};
	return (
		<div>
			<EditCategory selectedCategory={selectedCategory} />

			<p className="text-lead"> {categories.length} Categories found !</p>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Status</th>
						<th>Name</th>
						<th>Parent Category</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((item, i) => {
						return (
							<tr key={item._id}>
								<td>{i + 1}</td>
								<td
									className={
										item.status === 'active' ? 'text-success' : 'text-danger'
									}
								>
									{item.status}
								</td>
								<td>{item.catName}</td>
								<td>{item.parentCatId}</td>
								<td>
									<Button
										variant="warning"
										className="mx-1"
										onClick={() => handleOnEdit(item)}
									>
										Edit
									</Button>
									<Button
										title="You can only delete if Child category does not exist"
										onClick={() => handleOnDelete(item._id)}
										variant="danger"
										className="mx-1"
									>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default CategoryTable;
