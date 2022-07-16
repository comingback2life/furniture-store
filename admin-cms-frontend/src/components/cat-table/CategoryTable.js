import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAction } from '../../pages/categories/CategoriesAction';

const CategoryTable = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categories);
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, []);
	return (
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
						<tr>
							<td>{i + 1}</td>
							<td>{item.status}</td>
							<td>{item.catName}</td>
							<td>{item.parentCatId}</td>
							<td>
								<Button variant="warning" className="mx-1">
									Edit
								</Button>
								<Button variant="danger" className="mx-1">
									Delete
								</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default CategoryTable;
